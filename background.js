
chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		func: toggle 
	});
});

chrome.storage.onChanged.addListener(storage_on_changed);

chrome.storage.local.set({active: true});

function toggle(){
	chrome.storage.local.get('active', function(obj){
		chrome.storage.local.set({active: !obj.active});
	});
}

function storage_on_changed(changes, area_name) {
    if (area_name == "local") {
        if (changes.active.oldValue == false && changes.active.newValue == true) {
            chrome.declarativeNetRequest.updateEnabledRulesets({enableRulesetIds: ["ruleset_1"]});
			updateBadge('green', '')
        }
        else if (changes.active.oldValue == true && changes.active.newValue == false) {
            chrome.declarativeNetRequest.updateEnabledRulesets({disableRulesetIds: ["ruleset_1"]});
			updateBadge('red', 'OFF');
        }
    }
}

function updateBadge(newColor, newText){
	chrome.action.setBadgeBackgroundColor({color: newColor});
	chrome.action.setBadgeText({text: newText});
}

