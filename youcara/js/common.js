/////////////////////////////////////////////////////////////
// Global Variables used by the Framework
/////////////////////////////////////////////////////////////

var LF = '\n';
var NBSP = '';

var RunAt = new Object();
RunAt.SERVER = 0;
RunAt.CLIENT = 1;


/////////////////////////////////////////////////////////////
// Utility Classes
/////////////////////////////////////////////////////////////

/*
+ ---------------------------------------------------------------------------------+
| Purpose..:  Sets the color in a row of the Listcontrol if the cursors is moved
|             over the row.
|
| Date        Author            Notice
| ----------  ----------------  ----------------------------------------------------
| 23.12.2002  G.Schulz (SCC)    Erstversion
|
+ ---------------------------------------------------------------------------------+
*/

function CCUtility() {}
function CCUtility_getEnclosingForm(node) {
	// search the form wich embbeds the Element
	var parent = node.parentNode;
	
	if (null == parent) return null;
	
	if (parent.nodeName == 'FORM' ) {
		return parent;
	} else {
		return arguments.callee(parent);
	}
}
function CCUtility_createHidden(fldName, fldValue) {
	var input=document.createElement('INPUT');
	input.type='hidden';
	input.id=fldName;
	input.name=fldName;
	input.value=fldValue;
	return input;
}
function CCUtility_crtCtrla(node, param) {
	var form = this.getEnclosingForm(node);
	
	if (null == form) {
		// form not specified -> do nothing
		return;
	} else {
		form.appendChild(this.createHidden('ctrla', param));
		form.submit();

	}
}

new CCUtility();
CCUtility.getEnclosingForm   = CCUtility_getEnclosingForm;
CCUtility.createHidden       = CCUtility_createHidden;
CCUtility.crtCtrla           = CCUtility_crtCtrla;

