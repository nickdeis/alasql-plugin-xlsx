import X from "xlsx";
import builder from "../builder.js"

const utils = builder.utils;


/**
	Export to XLSX function
	@function
	@param {string|object} filename Filename or options
	@param {object|undefined} opts Options or undefined
	@param {array} data Data
	@param {array} columns Columns
	@param {callback} cb Callback function
	@return {number} Number of files processed
*/

export default function XLSX(filename, opts, data, columns, cb) {

	/** @type {number} result */
	var res = 1;

	if(utils.deepEqual(columns,[{columnid:'_'}])) {
		data = data.map(function(dat){return dat._;});
		columns = undefined;
	}


	/* If called without filename, use opts */
	if(typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	};


	/** @type {object} Workbook */
	var wb = {SheetNames:[], Sheets:{}};

	// Check overwrite flag
	if(opts.sourcefilename) {
		utils.loadBinaryFile(opts.sourcefilename,!!cb,function(data){
			wb = xlsx.read(data,{type:'binary'});
			doExport();
        });
	} else {
		doExport();
	};

	/* Return result */
	if(cb) res = cb(res);
	return res;

	/**
		Export workbook
		@function
	*/
	function doExport() {

		/*
			If opts is array of arrays then this is a
			multisheet workboook, else it is a singlesheet
		*/
		if(typeof opts == 'object' && opts instanceof Array) {
			if(data && data.length > 0) {
				data.forEach(function(dat,idx){
					prepareSheet(opts[idx],dat,undefined,idx+1)
				});
			}
		} else {
			prepareSheet(opts,data,columns,1);
		}

		saveWorkbook(cb);

	}


	/**
		Prepare sheet
		@params {object} opts
		@params {array} data
		@params {array} columns Columns
	*/
	function prepareSheet(opts, data, columns, idx) {

		/** Default options for sheet */
		var opt = {sheetid:'Sheet '+idx,headers:true};
		utils.extend(opt, opts);

		// Generate columns if they are not defined
		if((!columns || columns.length == 0) && data.length > 0) {
			columns = Object.keys(data[0]).map(function(columnid){return {columnid:columnid}});
		}

		var cells = {};

		if(wb.SheetNames.indexOf(opt.sheetid) > -1) {
			cells = wb.Sheets[opt.sheetid];
		} else {
			wb.SheetNames.push(opt.sheetid);
			wb.Sheets[opt.sheetid] = {};
			cells = wb.Sheets[opt.sheetid];
		}

		var range = "A1";
		if(opt.range) range = opt.range;

		var col0 = utils.xlscn(range.match(/[A-Z]+/)[0]);
		var row0 = +range.match(/[0-9]+/)[0]-1;

		if(wb.Sheets[opt.sheetid]['!ref']) {
			var rangem = wb.Sheets[opt.sheetid]['!ref'];
			var colm = utils.xlscn(rangem.match(/[A-Z]+/)[0]);
			var rowm = +rangem.match(/[0-9]+/)[0]-1;
		} else {
			var colm = 1, rowm = 1;
		}
		var colmax = Math.max(col0+columns.length,colm);
		var rowmax = Math.max(row0+data.length+2,rowm);


		var i = row0+1;

		wb.Sheets[opt.sheetid]['!ref'] = 'A1:'+utils.xlsnc(colmax)+(rowmax);


		if(opt.headers) {
			columns.forEach(function(col, idx){
				cells[utils.xlsnc(col0+idx)+""+i] = {v:col.columnid.trim()};
			});
			i++;
		}

		for(var j=0;j<data.length;j++) {
			columns.forEach(function(col, idx){
				var cell = {v:data[j][col.columnid]};
				if(typeof data[j][col.columnid] == 'number') {
					cell.t = 'n';
				} else if(typeof data[j][col.columnid] == 'string') {
					cell.t = 's';
				} else if(typeof data[j][col.columnid] == 'boolean') {
					cell.t = 'b';
				} else if(typeof data[j][col.columnid] == 'object') {
					if(data[j][col.columnid] instanceof Date) {
						cell.t = 'd';
					}
				}
				cells[utils.xlsnc(col0+idx)+""+i] = cell;
			});
			i++;
		}

	}

	/**
		Save Workbook
		@params {array} wb Workbook
		@params {callback} cb Callback
	*/
	function saveWorkbook(cb) {



		if(typeof filename == 'undefined') {
			res = wb;
		} else {
			if(typeof exports == 'object') {
				/* For Node.js */
				xlsx.writeFile(wb, filename);
			} else {
				/* For browser */
				var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
				var wbout = xlsx.write(wb,wopts);

				function s2ab(s) {
				  var buf = new ArrayBuffer(s.length);
				  var view = new Uint8Array(buf);
				  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
				  return buf;
				}

				/* the saveAs call downloads a file on the local machine */
		//		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), '"'+filename+'"')
		//		saveAs(new Blob([s2ab(wbout)],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), filename)
		//		saveAs(new Blob([s2ab(wbout)],{type:"application/vnd.ms-excel"}), '"'+filename+'"');
				if(utils.isIE() == 9) {
					throw new Error('Cannot save XLSX files in IE9. Please use XLS() export function');


		/** @todo Check if this code is required */



				} else {
					utils.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), filename);
				}
			}

		}

	};
};