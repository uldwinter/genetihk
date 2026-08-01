runAudit = function () {
  const raw = $('pageInput').value.trim();
  if (!raw) {
    toast('Добавьте HTML или текст страницы');
    return;
  }

  let doc;
  let text;

  if (sourceMode === 'html') {
    doc = new DOMParser().parseFromString(raw, 'text/html');
    const textDoc = doc.cloneNode(true);
    qsa('script,style,noscript,svg', textDoc).forEach(node => node.remove());
    text = cleanText(textDoc.body?.innerText || textDoc.body?.textContent);
  } else {
    doc = document.implementation.createHTMLDocument('');
    doc.body.innerHTML = `<main><h1>${escapeHtml($('projectName').value)}</h1><p>${escapeHtml(raw)}</p></main>`;
    text = cleanText(raw);
  }

  currentText = text;
  audit = analyze(doc, text);
  renderAudit();
  generateAssets();
  switchTab('report');
};

$('runAudit').onclick = runAudit;
$('runAuditSide').onclick = runAudit;
