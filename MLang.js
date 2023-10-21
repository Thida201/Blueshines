'use strict';

function replaceTextNode (entries, ...contextNodeList) {

	for (let contextNode of contextNodeList) {
	    const xpathResult = document.evaluate('descendant::text()', contextNode, null, 
												XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		let i = xpathResult.snapshotLength;

		while (i--) {
			const textNode = xpathResult.snapshotItem(i);
			for (let [key, value] of entries){
				textNode.data = textNode.data.replace(new RegExp('\\${' + key + '}', 'g'), value);
			}
		}
	}
	
}

// 非同期でJSONデータを取得する
		
	// fetch('lang.json')
	// .then(response => response.json())
	// .then(contentEntries => {
      
	// 	//Getパラメータの値を取得
	// 	const lang = new URLSearchParams(location.search).get('lang');
		
	// 	//JSONのデータから該当する言語のデータを取得
	// 	const contents = contentEntries[lang];
		

	// 	//データがない場合は処理を終える
	// 	if (!contents) return;
	// 	// if(contents = false) {
	// 	// 	return;
	// 	// }-

	// 	//HTMLファイルの言語を変更
	// 	document.documentElement.lang = lang;

	// 	const df = document.getElementById('sample').content.cloneNode(true);
	// 	//置き換えメソッドをコール
	// 	replaceTextNode(Object.entries(contents), ...df.childNodes);
	// 	document.body.appendChild(df);
	// });

	fetch('./lang.json')
	.then(response => response.json())
	.then(contentEntries => {
      
		//Getパラメータの値を取得
		const langParam = new URLSearchParams(location.search).get('lang');
		//JSONのデータから該当する言語のデータを取得
		
		const lang = langParam && contentEntries[langParam] ? langParam : 'ja';
		const contents = contentEntries[lang];

		//データがない場合は処理を終える
		if (!contents) return;

		//HTMLファイルの言語を変更
		document.documentElement.lang = lang;

		const df = document.getElementById('sample').content.cloneNode(true);
		//置き換えメソッドをコール
		replaceTextNode(Object.entries(contents), ...df.childNodes);
		document.body.appendChild(df);
	});


	


	


