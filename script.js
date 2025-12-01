/* ==========================================
   UTILITÁRIOS GERAIS
   ========================================== */
function showMsg(elementId, text, type) {
    const color = type === 'success' ? 'text-success' : 'text-danger';
    const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>';
    $(`#${elementId}`).html(`<span class="${color} fw-bold">${icon} ${text}</span>`);
    setTimeout(() => $(`#${elementId}`).html(''), 5000);
}

function random(n) { return Math.round(Math.random() * n); }
function mod(dividendo, divisor) { return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor)); }

/* ==========================================
   DOCUMENTOS (CPF, CNPJ, NFe)
   ========================================== */
// --- CPF ---
function gerarCPF(comPontuacao) {
    let n = 9, n1 = random(n), n2 = random(n), n3 = random(n), n4 = random(n), n5 = random(n), n6 = random(n), n7 = random(n), n8 = random(n), n9 = random(n);
    let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10; d1 = 11 - (mod(d1, 11)); if (d1 >= 10) d1 = 0;
    let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11; d2 = 11 - (mod(d2, 11)); if (d2 >= 10) d2 = 0;
    let cpf = comPontuacao ? `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}` : `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
    $('#inputCpf').val(cpf); showMsg('msgCpf', 'Gerado!', 'success');
}
function validarCPFInput() {
    let cpf = $('#inputCpf').val().replace(/[^\d]+/g, '');
    if (cpf == '' || cpf.length != 11 || /^(\d)\1{10}$/.test(cpf)) return showMsg('msgCpf', 'Inválido', 'error');
    let add = 0; for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11); if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return showMsg('msgCpf', 'Inválido', 'error');
    add = 0; for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11); if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return showMsg('msgCpf', 'Inválido', 'error');
    return showMsg('msgCpf', 'Válido', 'success');
}

// --- CNPJ ---
function gerarCNPJ(comPontuacao) {
    let n = 9, n1 = random(n), n2 = random(n), n3 = random(n), n4 = random(n), n5 = random(n), n6 = random(n), n7 = random(n), n8 = random(n);
    let n9 = 0, n10 = 0, n11 = 0, n12 = 1;
    let d1 = n12*2 + n11*3 + n10*4 + n9*5 + n8*6 + n7*7 + n6*8 + n5*9 + n4*2 + n3*3 + n2*4 + n1*5; d1 = 11 - (mod(d1, 11)); if (d1 >= 10) d1 = 0;
    let d2 = d1*2 + n12*3 + n11*4 + n10*5 + n9*6 + n8*7 + n7*8 + n6*9 + n5*2 + n4*3 + n3*4 + n2*5 + n1*6; d2 = 11 - (mod(d2, 11)); if (d2 >= 10) d2 = 0;
    let cnpj = comPontuacao ? `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}` : `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
    $('#inputCnpj').val(cnpj); showMsg('msgCnpj', 'Gerado!', 'success');
}
function validarCNPJInput() {
    let cnpj = $('#inputCnpj').val().replace(/[^\d]+/g, '');
    if(cnpj == '' || cnpj.length != 14 || /^(\d)\1{13}$/.test(cnpj)) return showMsg('msgCnpj', 'Inválido', 'error');
    let t = cnpj.length - 2, n = cnpj.substring(0, t), d = cnpj.substring(t), s = 0, p = t - 7;
    for (let i = t; i >= 1; i--) { s += n.charAt(t - i) * p--; if (p < 2) p = 9; }
    let r = s % 11 < 2 ? 0 : 11 - s % 11; if (r != d.charAt(0)) return showMsg('msgCnpj', 'Inválido', 'error');
    t = t + 1; n = cnpj.substring(0, t); s = 0; p = t - 7;
    for (let i = t; i >= 1; i--) { s += n.charAt(t - i) * p--; if (p < 2) p = 9; }
    r = s % 11 < 2 ? 0 : 11 - s % 11; if (r != d.charAt(1)) return showMsg('msgCnpj', 'Inválido', 'error');
    return showMsg('msgCnpj', 'Válido', 'success');
}

// --- NFe ---
function validarNFeInput() {
    let chave = $('#inputNfe').val().replace(/[^\d]+/g, '');
    if (chave.length !== 44) return showMsg('msgNfe', `Inválida (${chave.length} dígitos)`, 'error');
    let corpo = chave.substring(0, 43), mult = [2,3,4,5,6,7,8,9], soma = 0, pos = 0;
    for(let i = 42; i >= 0; i--) { soma += parseInt(corpo.charAt(i)) * mult[pos]; pos++; if(pos > 7) pos = 0; }
    let dv = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    if (dv == parseInt(chave.charAt(43))) showMsg('msgNfe', 'Chave Válida', 'success');
    else showMsg('msgNfe', `Inválida (Esperado: ${dv})`, 'error');
}

/* ==========================================
   SEGURANÇA
   ========================================== */
function gerarSenha() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let len = $('#passLen').val(), pass = "";
    for (let i = 0; i < len; i++) pass += chars[Math.floor(Math.random() * chars.length)];
    $('#resultSenha').val(pass);
}
function validarEmail() {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#inputEmail').val())) showMsg('msgEmail', 'E-mail Válido', 'success');
    else showMsg('msgEmail', 'E-mail Inválido', 'error');
}
function testarRegex() {
    try {
        let regex = new RegExp($('#regexPattern').val(), "g");
        if (regex.test($('#regexTestString').val())) showMsg('msgRegex', 'Match Encontrado!', 'success');
        else showMsg('msgRegex', 'Nenhum match.', 'error');
    } catch (e) { showMsg('msgRegex', 'Erro na Regex', 'error'); }
}

/* ==========================================
   FORMATADORES & DIFF
   ========================================== */
function formatarCodigo(tipo) {
    let input = $('#inputFormat').val();
    if (!input) return;

    if (tipo === 'json') {
        try { $('#outputFormat').val(JSON.stringify(JSON.parse(input), null, 4)); } 
        catch (e) { $('#outputFormat').val("JSON Inválido"); }
    } else if (tipo === 'html') {
        $('#outputFormat').val(html_beautify(input, { indent_size: 4 }));
    } else if (tipo === 'xml') {
        $('#outputFormat').val(formatXml(input));
    } else if (tipo === 'sql') {
        $('#outputFormat').val(beautifyCustomSQL(input));
    }
}

// === FORMATADOR SQL CUSTOMIZADO (DBA / RED-GATE STYLE) ===

function splitSafe(str, delimiter) {
    let result = [], current = '', parenLevel = 0;
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (char === '(') parenLevel++;
        if (char === ')') parenLevel--;
        if (char === delimiter && parenLevel === 0) { result.push(current); current = ''; } 
        else { current += char; }
    }
    result.push(current);
    return result;
}

function beautifyCustomSQL(sql) {
    // 1. Limpeza básica
    sql = sql.replace(/\s+/g, ' ').trim();
    
    let formatted = sql;

    // --- A. ESTRUTURA MACRO: Forçar quebras nos blocos principais ---
    // Isso garante que WHERE nunca fique na mesma linha que ON ou JOIN
    const keywords = ["FROM", "WHERE", "ORDER BY", "GROUP BY", "HAVING", "INSERT INTO", "UPDATE", "DELETE", "Begin Try", "End Try", "Begin Catch", "End Catch"];
    keywords.forEach(kw => {
        let re = new RegExp(`\\s+${kw}\\s+`, "gi");
        formatted = formatted.replace(re, `\n${kw} `);
    });

    // --- B. TRATAR SELECT (Colunas) ---
    formatted = formatted.replace(/SELECT\s+(.+?)(?=\s+(?:FROM|INTO|WHERE|GROUP|ORDER|HAVING|UNION|$))/gi, function(match, columns) {
        let cols = splitSafe(columns, ',');
        cols = cols.map(c => c.trim()).filter(c => c);
        
        let hasEquals = cols.every(c => c.includes('=') && !c.includes('=='));

        if (hasEquals && cols.length > 1) {
             let maxLen = 0;
             let parsed = cols.map(c => {
                 let parts = c.split('=');
                 let name = parts[0].trim();
                 let val = parts.slice(1).join('=').trim();
                 if (name.length > maxLen) maxLen = name.length;
                 return {name, val};
             });
             return "SELECT " + parsed.map((p, i) => {
                 let padding = " ".repeat(maxLen - p.name.length);
                 let prefix = i === 0 ? "" : "       ";
                 return `${prefix}${p.name}${padding} = ${p.val}`;
             }).join(",\n");
        } else {
            return "SELECT " + cols.map((c, i) => {
                let prefix = i === 0 ? "" : "       ";
                return `${prefix}${c}`;
            }).join(",\n");
        }
    });

    // --- C. TRATAR JOINS ---
    // A tabela anterior permanece na linha. O join fica nela. A próxima tabela cai.
    formatted = formatted.replace(/\s+(INNER|LEFT|RIGHT|FULL|CROSS|OUTER)?\s*JOIN\s+/gi, function(match) {
        return " " + match.trim() + "\n      "; 
    });

    // --- D. TRATAR ON ---
    formatted = formatted.replace(/\s+ON\s+/gi, "\n            ON ");

    // --- E. TRATAR WHERE (Internos) ---
    // O regex captura o bloco WHERE inteiro até o próximo comando principal
    // E então substitui os AND/OR dentro dele
    formatted = formatted.replace(/(WHERE\s+)([\s\S]+?)(?=$|\n(?:ORDER|GROUP|HAVING|OPTION|UNION))/gi, function(match, whereTag, content) {
        
        // Substitui AND/OR por quebra de linha + indentação (6 espaços)
        let newContent = content.replace(/\s+AND\s+/gi, "\n      AND ");
        newContent = newContent.replace(/\s+OR\s+/gi, "\n      OR ");
        
        return whereTag + newContent;
    });

    // --- F. TRATAR DECLARE e EXEC ---
    formatted = formatted.replace(/DECLARE\s+([^;]+?)(?=\s+(?:SELECT|SET|FROM|GO|$))/gi, function(match, content) {
        let vars = splitSafe(content, ',');
        vars = vars.map(v => v.trim());
        let isTyped = vars.every(v => v.trim().includes(' '));
        if(!isTyped) return "DECLARE " + vars.join(",\n        ");

        let maxLen = 0;
        let parsed = vars.map(v => {
            let parts = v.split(/\s+/);
            let name = parts[0];
            let type = parts.slice(1).join(' ');
            if (name.length > maxLen) maxLen = name.length;
            return { name, type };
        });
        return "\nDECLARE " + parsed.map((v, i) => {
            let padding = " ".repeat(maxLen - v.name.length);
            let prefix = i === 0 ? "" : "        ";
            return `${prefix}${v.name}${padding} ${v.type.toUpperCase()}`;
        }).join(",\n");
    });

    formatted = formatted.replace(/EXEC\s+(\w+)\s+([^;]+)/gi, function(match, proc, args) {
        let params = splitSafe(args, ',');
        params = params.map(p => p.trim());
        let prefixBase = `\nEXEC ${proc} `; 
        let indentSize = prefixBase.length - 1; 
        let indentString = " ".repeat(indentSize);
        return prefixBase + params.map((p, i) => {
            if (i === 0) return p;
            return `${indentString}${p}`;
        }).join(",\n");
    });

    // Remove linhas em branco extras no início e fim
    return formatted.replace(/^\s+|\s+$/g, "");
}

function formatXml(xml) {
    let formatted = '', pad = 0;
    xml = xml.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3');
    xml.split('\r\n').forEach(node => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) indent = 0;
        else if (node.match(/^<\/\w/)) { if (pad != 0) pad -= 1; }
        else if (node.match(/^<\w[^>]*[^\/]>.*$/)) indent = 1;
        let padding = ''; for (let i = 0; i < pad; i++) padding += '    ';
        formatted += padding + node + '\r\n';
        pad += indent;
    });
    return formatted;
}

function compararTextos() {
    const d = Diff.diffWords($('#diffOld').val(), $('#diffNew').val()), f = document.createDocumentFragment();
    d.forEach(p => {
        const s = document.createElement('span');
        s.className = p.added ? 'bg-success text-white p-1' : p.removed ? 'bg-danger text-white text-decoration-line-through p-1' : 'text-dark';
        s.appendChild(document.createTextNode(p.value)); f.appendChild(s);
    });
    $('#diffResult').html('').append(f);
}