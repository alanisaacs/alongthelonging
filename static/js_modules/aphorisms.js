/* JavaScript for Aphorisms */

function initAphorisms() {
    // Code required to load page, called from main.js
    show_set_selections();
    show_view('flow');
    // Add listeners to buttons on the page
    document.getElementById('my_favorite_flow').addEventListener(
        'click', () => show_view('flow'));
    document.getElementById('random_one').addEventListener(
        'click', show_random_one);
    document.getElementById('one_set').addEventListener(
        'click', show_one_set_random);
    document.getElementById('all_by_category').addEventListener(
        'click', show_all_by_set);
    document.getElementById("select_set").addEventListener(
        'change', show_selected_set);
}

function display_article(contents_and_endnotes, mode) {
    // Display contents on the page
    // Pass in an array: contents_and_endnotes is [contents, endnotes]
    // Also pass "mode", which allows resetting selector
    let HTMLString = "";
    HTMLString += contents_and_endnotes[0];
    if (contents_and_endnotes[1]) {
        HTMLString += "<div class=endnotes><p>NOTES</p>" + 
            contents_and_endnotes[1] + "</div>";
    }
    if (mode != "leave_selector") {
            reset_selector();
    }
    displaybox.innerHTML = HTMLString;
}

function reset_selector() {
    // reset set selector so same-as-last category is selectable
    document.getElementById("setselector").value = "-- Select --";
}

function show_set_selections() {
    // Populate dropdown for set selection
    let HTMLString = "<select id='setselector'" +
        "value='' class='setselector'>" +
        "<option selected disabled hidden>-- Select --</option>";
    let list_of_sets = get_list_of_sets();
    for (let i=0; i<list_of_sets.length; i++) {
        let setname = list_of_sets[i];
        HTMLString += "<option value= " + setname +
            ">" + setname + "</option>";
    }
    HTMLString += "</select>";
    document.getElementById("select_set").innerHTML = HTMLString;
}

function show_selected_set() {
    let setname = document.getElementById("setselector").value;
    let mode = "leave_selector";
    show_one_set(setname, mode);
}

function show_view(viewname) {
    // Display aphorisms associated with view
    // Include suffixes
    // Get data object from DOM
    const dbox = document.getElementById('displaybox');
    const aphos = dbox.aphos;
    let aphos_in_flow = "";
    // Rename "flow" in subheader to "My Favorite Flow"
    let subheading = "";
    if (viewname == "flow") {
        subheading = "my favorite flow";
    } else {
        subheading = viewname;
    }
    aphos_in_flow += "<div class=set_header>" + subheading + "</div>";
    let endnotes = "";
    for (let a of aphos) {
        // Add to display if "view" matches requested
        if (a.view == viewname) {
            aphos_in_flow += "<div class=apho>" + 
            a.contents + 
            a.suffix +
            "</div>";
            endnotes += a.endnote;
        }
    }
    let contents_and_endnotes = [aphos_in_flow, endnotes];
    display_article(contents_and_endnotes);
}

function get_one_set(setname) {
    // Return aphos that have setname as their set
    // Include endnotes
    const dbox = document.getElementById('displaybox');
    const aphos = dbox.aphos;
    let aphos_in_set = "";
    let endnotes = "";
    for (let a of aphos) {
        if (a.set == setname) {
            aphos_in_set += "<div class=apho>";
            aphos_in_set += a.contents;
            aphos_in_set += "</div>";
            endnotes += a.endnote;
        }
    }
    let contents_and_endnotes = [aphos_in_set, endnotes];
    return (contents_and_endnotes);
}
    
function show_one_set(setname, mode) {
    let contents_and_endnotes = get_one_set(setname);
    contents_and_endnotes[0] = "<div class=set_header>" + 
        setname + "</div>" + contents_and_endnotes[0];
    display_article(contents_and_endnotes, mode);
}

function show_one_set_random() {
    let list_of_sets = get_list_of_sets();
    let rndnum = Math.floor(Math.random() * list_of_sets.length);
    let setname = list_of_sets[rndnum];
    let mode = "reset_selector";
    show_one_set(setname, mode);
}

function get_list_of_sets() {
    // Return an array containing all the sets
    // Create a javascript set to remove duplicates
    const dbox = document.getElementById('displaybox');
    const aphos = dbox.aphos;
    let s = new(Set);
    for (let a of aphos) {
        s.add(a.set);
    }
    // Convert to array in order to sort
    let list_of_sets = Array.from(s);
    list_of_sets.sort();
    return list_of_sets;
}

function show_all_by_set() {
    // Display the whole list of aphorisms
    let list_of_sets = get_list_of_sets();
    // Initialize arrays that will pass contents and endnotes
    //      as strings to be displayed
    let con_end_set = ["", ""];
    let con_end_all = ["", ""];
    for (let i=0; i<list_of_sets.length; i++) {
        let setname = list_of_sets[i];
        con_end_set = get_one_set(setname);
        con_end_set[0] = "<div class=set_header>" + 
            setname + "</div>" + con_end_set[0];
        // Append set contents to complete strings
        con_end_all[0] = con_end_all[0] + con_end_set[0];
        con_end_all[1] = con_end_all[1] + con_end_set[1];
    }
    display_article(con_end_all);
}

function show_random_one() {
    const dbox = document.getElementById('displaybox');
    const aphos = dbox.aphos;
    let numaphos = aphos.length;
    let rndnum = Math.floor(Math.random() * numaphos) + 1;
    let counter = 1;
    let aphofound = false;
    let apho_contents = "";
    let apho_endnotes = "";
    for (let a of aphos) {
        if (counter == rndnum) {
            if (aphofound == false) {
                    apho_contents += "<div class=set_header>" + 
                        "one for you</div>";
                    apho_contents += "<div class=apho>";
                    apho_contents += a.contents;
                    apho_contents += "</div>";
                    apho_endnotes += a.endnote;
                    aphofound = true;
                }
            } else {
                counter++;
            }
    }
    display_article([apho_contents, apho_endnotes]);
}

export { initAphorisms };