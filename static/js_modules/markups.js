// Find certain characters user can enter as markup
// and convert them to UTF-8 characters or html tags
function convertUserMarkup(str) {
	let s = str;
	if (s) {    // Avoid errors when text is null
        // Replace double hyphens with em dashes
        s = s.replace(/--/g, '—')
        // Treat underscores around words as <em> tags
		// Replace space+underscore+character
		s = s.replace(/(\s)_(\w)/g, '$1<em>$2');
		// Replace character+underscore+space/punctuation
		s = s.replace(/(\w)_([\s,.;&)<-—])/g, '$1</em>$2');
	}
	return s;
}

function markupForDisplay(str) {
    let s = str;
    if (s) {
        // Convert special markup entered by user
        s = convertUserMarkup(s);
        // Make any html tags work invisibly (again)
        s = s.replace(/&lt;/g, '<');
        s = s.replace(/&gt;/g, '>');
        // Remove trailing BR tags
        s = s.replace(/<br>$/, '');
        return s;
    }
}

function markupForEditing(str) {
    let s = str;
    if (s) {
        // Replace <em> tags with underscores
        s = s.replace(/<em>/g, '_');
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
}

function markupMultilineNotes(str) {
    let noteStr = str;
    if (noteStr) {
        // Remove initial hyphens
        noteStr = noteStr.replace(/^- /, '')
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
}

export { convertUserMarkup, markupForDisplay, markupForEditing, 
            markupMultilineNotes };