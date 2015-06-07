// $ :: String, Document || Element -> Element || null
function $(sel, con) {
    return (con || document).querySelector(sel);
}

// $$ :: String, Document || Element -> [Element]
function $$(sel, con) {
    return Array.from((con || document).querySelectorAll(sel));
}
