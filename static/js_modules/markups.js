// Find certain characters user can enter as markup
// and convert them to UTF-8 characters or html tags
function convertUserMarkup(text) {
	let s = text;
	if (s) {    // Avoid errors when text is null
        // Treat underscores around words as <em> tags
		// Replace space+underscore+character
		s = s.replace(/(\s)_(\w)/g, '$1<em>$2');
		// Replace character+underscore+space/punctuation
		s = s.replace(/(\w)_([\s,.;&)<])/g, '$1</em>$2');
        // Replace double hyphens with em dashes
        s = s.replace(/--/g, '—')
	}
	return s;
}

function markupForDisplay(str) {
    // Convert special markup entered by user
    let s = convertUserMarkup(str);
    // Make any html tags work invisibly (again)
    s = s.replace(/&lt;/g, '<');
    s = s.replace(/&gt;/g, '>');
    // Remove trailing BR tags
    s = s.replace(/<br>$/, '');
    return s;
}

function markupForEditing(str) {
    // Replace <em> tags with underscores
    let s = str.replace(/<em>/g, '_');
    s = s.replace(/<\/em>/g, '_');
    // Keep <br> tags by temporarily replacing < and >
    s = s.replace(/<br>/g, '=br=');
    // Show other tags with <> characters for editing
    s = s.replace(/</g, '&lt;');
    s = s.replace(/>/g, '&gt;');
    // Now bring back <br> so those you don't see
    s = s.replace(/=br=/g, '<br>')
    return s;
}

function markupMultilineNotes(str) {
    // Remove initial hyphens
    let noteStr = str.replace(/^- /, '')
    // Prefix whole string with a <LI> node
    noteStr = "<li>".concat(noteStr);
    // Some notes have <BR> tags in them
    // (followed by hyphen+space)
    // Make these into additional <LI> nodes
    noteStr = noteStr.replace(/<br>- /g, '<li>');
    // Remove any trailing <LI> nodes
    noteStr = noteStr.replace(/<li>$/g, '');
    return noteStr;
}

export { convertUserMarkup, markupForDisplay, markupForEditing, 
            markupMultilineNotes };