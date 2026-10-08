(function() {
    "use strict";
    var ORIGINAL = "<!doctype html>\n" + document.documentElement.outerHTML;
    document.documentElement.classList.add("js");

    var CAREERS = [
        { id: "alimentos", name: "Alimentos", l: "A", c: "var(--l-alimentos)" },
        { id: "civil", name: "Civil", l: "C", c: "var(--l-civil)" },
        { id: "industrial", name: "Industrial", l: "I", c: "var(--l-industrial)", light: true },
        { id: "mecanica", name: "Mecánica", l: "M", c: "var(--l-mecanica)" },
        { id: "quimica", name: "Química", l: "Q", c: "var(--l-quimica)" },
        { id: "sistemas", name: "Sistemas", l: "S", c: "var(--l-sistemas)" },
        { id: "electronica", name: "Electrónica", l: "E", c: "var(--l-electronica)" },
        { id: "mecanica-ind", name: "Mecánica Ind.", l: "MI", c: "var(--l-mecanica-ind)" }
    ];
    var byId = {};
    CAREERS.forEach(function(c) { byId[c.id] = c; });

    /* ---------- Map ---------- */
    var MAP = [
        { id: "alimentos", d: "M48 118H180L300 238", b: [48, 118], t: [34, 90, "start"] },
        { id: "civil", d: "M48 240H250L300 290", b: [48, 240], t: [34, 212, "start"] },
        { id: "industrial", d: "M48 360H250L300 310", b: [48, 360], t: [34, 408, "start"] },
        { id: "mecanica", d: "M48 482H180L300 362", b: [48, 482], t: [34, 530, "start"] },
        { id: "quimica", d: "M672 118H540L420 238", b: [672, 118], t: [686, 90, "end"] },
        { id: "sistemas", d: "M672 240H470L420 290", b: [672, 240], t: [686, 212, "end"] },
        { id: "electronica", d: "M672 360H470L420 310", b: [672, 360], t: [686, 408, "end"] },
        { id: "mecanica-ind", d: "M672 482H540L420 362", b: [672, 482], t: [686, 530, "end"] }
    ];
    var NS = "http://www.w3.org/2000/svg";

    function el(tag, attrs, parent) {
        var e = document.createElementNS(NS, tag);
        for (var k in attrs) e.setAttribute(k, attrs[k]);
        if (parent) parent.appendChild(e);
        return e;
    }
    
    var linesG = document.getElementById("lines"),
        map = document.getElementById("map");
        
    MAP.forEach(function(m, i) {
        var car = byId[m.id];
        var g = el("g", { "class": "line", "data-line": m.id, tabindex: "0", role: "button", "aria-label": "Línea " + car.name }, linesG);
        el("path", { "class": "casing", d: m.d }, g);
        el("path", { d: m.d, stroke: getComputedStyle(document.documentElement).getPropertyValue("--l-" + m.id).trim(), "class": "draw", pathLength: "1", style: "animation-delay:" + (120 + i * 90) + "ms" }, g);
        var bg = el("g", { "class": "bullet pop" + (car.light ? " bullet--light" : ""), style: "animation-delay:" + (500 + i * 90) + "ms" }, g);
        el("circle", { cx: m.b[0], cy: m.b[1], r: "22", fill: getComputedStyle(document.documentElement).getPropertyValue("--l-" + m.id).trim() }, bg);
        var tx = el("text", { x: m.b[0], y: m.b[1] + 1 }, bg);
        tx.textContent = car.l;
        var lb = el("text", { "class": "name pop", x: m.t[0], y: m.t[1], "text-anchor": m.t[2], style: "animation-delay:" + (620 + i * 90) + "ms" }, g);
        lb.textContent = car.name;

        function on() { map.classList.add("is-focus"); g.classList.add("is-on"); }
        function off() { map.classList.remove("is-focus"); g.classList.remove("is-on"); }
        
        g.addEventListener("mouseenter", on);
        g.addEventListener("mouseleave", off);
        g.addEventListener("focus", on);
        g.addEventListener("blur", off);
    });

    /* ---------- Legend ---------- */
    var legend = document.getElementById("legend");
    CAREERS.forEach(function(c) {
        var li = document.createElement("li");
        li.innerHTML = '<span class="bul' + (c.light ? ' bul--light' : '') + '" style="--c:' + c.c + '">' + c.l + '</span>Ingeniería ' + c.name;
        legend.appendChild(li);
    });
    var more = document.createElement("li");
    more.innerHTML = '<span class="dash" aria-hidden="true"></span>Y todas las demás carreras de la facultad';
    legend.appendChild(more);

    /* ---------- Axes ---------- */
    var AXES = [
        { k: "A", t: "Representación estudiantil", c: "var(--l-sistemas)", bc: "#071D40", d: "Llevar las inquietudes de los estudiantes al Consejo de Facultad y dar respuesta y seguimiento.", a: [["Buzón de sugerencias", "Físico y digital, abierto todo el año."], ["Encuestas semestrales", "Sobre las necesidades de cada carrera."], ["Representantes enlace", "Una persona de contacto por carrera."], ["Informes periódicos", "De lo que se trata ante el consejo."]] },
        { k: "B", t: "Formación académica y profesional", c: "var(--l-industrial)", bc: "#071D40", d: "Complementar lo que se aprende en clase con habilidades técnicas y blandas útiles para la vida laboral.", a: [["Charlas y talleres cortos", "Excel, programación básica, CV y entrevistas."], ["Grupos de estudio y tutorías", "Entre estudiantes, para los cursos más difíciles."], ["Apoyo en temporada de parciales", ""], ["Ferias de proyectos y retos tecnológicos", "Abiertos a todas las carreras.", true]] },
        { k: "C", t: "Integración y bienestar", c: "var(--l-quimica)", bc: "#fff", d: "Fortalecer la convivencia entre carreras y el sentido de comunidad en la facultad.", a: [["Bienvenida a primer ingreso", ""], ["Torneos deportivos entre carreras", ""], ["Convivios en fechas especiales", "Como la Semana de Ingeniería."]] },
        { k: "D", t: "Vinculación con el entorno", c: "var(--l-electronica)", bc: "#fff", d: "Conectar a los estudiantes con empresas, egresados y organizaciones profesionales.", a: [["Charlas con egresados y profesionales", "De distintas ramas."], ["Visitas técnicas a empresas", ""], ["Difusión de pasantías, becas y oportunidades", ""], ["Red de la Rama Estudiantil IEEE URL", "Para traer conferencistas, concursos y oportunidades.", true], ["Alianzas con organizaciones estudiantiles", "De cada carrera."]] }
    ];
    var tabs = document.getElementById("axisTabs"),
        panels = document.getElementById("axisPanels");

    AXES.forEach(function(ax, i) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "axis-tab"; b.id = "tab-" + ax.k; b.setAttribute("role", "tab");
        b.setAttribute("aria-controls", "panel-" + ax.k); b.setAttribute("aria-selected", i === 0 ? "true" : "false"); b.tabIndex = i === 0 ? 0 : -1;
        b.style.setProperty("--c", ax.c); b.style.setProperty("--bc", ax.bc);
        b.innerHTML = '<span class="bul">' + ax.k + '</span><span>' + ax.t + '</span>';
        tabs.appendChild(b);
        
        var p = document.createElement("div");
        p.className = "axis-panel"; p.id = "panel-" + ax.k; p.setAttribute("role", "tabpanel"); p.setAttribute("aria-labelledby", b.id); p.tabIndex = 0;
        p.style.setProperty("--c", ax.c); if (i !== 0) p.hidden = true;
        var lis = ax.a.map(function(x) { return '<li' + (x[2] ? ' class="is-hub"' : '') + '>' + x[0] + (x[1] ? '<small>' + x[1] + '</small>' : '') + '</li>'; }).join("");
        p.innerHTML = '<h3>' + ax.t + '</h3><p>' + ax.d + '</p><ol class="line-strip">' + lis + '</ol>';
        panels.appendChild(p);
    });

    function selectAxis(btn, focus) {
        tabs.querySelectorAll('[role=tab]').forEach(function(t) {
            var on = t === btn;
            t.setAttribute("aria-selected", on);
            t.tabIndex = on ? 0 : -1;
            var p = document.getElementById(t.getAttribute("aria-controls"));
            p.hidden = !on;
            if (on) {
                p.classList.remove("is-in");
                void p.offsetWidth;
                p.classList.add("is-in");
            }
        });
        if (focus) btn.focus();
    }

    tabs.addEventListener("click", function(e) { var b = e.target.closest('[role=tab]'); if (b) selectAxis(b); });
    tabs.addEventListener("keydown", function(e) {
        var all = [].slice.call(tabs.querySelectorAll('[role=tab]')), i = all.indexOf(document.activeElement);
        if (i < 0) return;
        var n = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") n = all[(i + 1) % all.length];
        else if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = all[(i - 1 + all.length) % all.length];
        else if (e.key === "Home") n = all[0];
        else if (e.key === "End") n = all[all.length - 1];
        if (n) { e.preventDefault(); selectAxis(n, true); }
    });

    /* ---------- Data ---------- */
    var DATA_EL = document.getElementById("datos");
    var data;
    try { data = JSON.parse(DATA_EL.textContent); } 
    catch (e) { data = { mascota: "", candidatos: [] }; }
    if (!Array.isArray(data.candidatos)) data.candidatos = [];
    
    var EDIT = /[?&]editar\b/.test(location.search);
    var DRAFT_KEY = "link-borrador-v1";
    
    if (EDIT) {
        try {
            var dr = localStorage.getItem(DRAFT_KEY);
            if (dr) {
                var parsed = JSON.parse(dr);
                if (parsed && Array.isArray(parsed.candidatos) && confirm("Hay cambios guardados en este navegador que aún no descargas. ¿Quieres recuperarlos?")) data = parsed;
            }
        } catch (e) {}
        document.documentElement.classList.add("is-editing");
    }

    function saveDraft() {
        if (!EDIT) return;
        try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } 
        catch (e) { toast("No se pudo guardar el borrador en este navegador. Descarga la página para no perder cambios."); }
    }

    function esc(s) {
        return String(s == null ? "" : s).replace(/[&<>"']/g, function(c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
        });
    }

    var ICON = {
        edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/></svg>',
        up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
        down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
        del: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
        person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
        plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
    };

    var list = document.getElementById("cands"), empty = document.getElementById("candsEmpty");

    function careerOf(c) {
        if (c.carrera && byId[c.carrera]) return byId[c.carrera];
        return { name: c.carreraOtra || "Ingeniería", l: (c.carreraOtra || "I").trim().charAt(0).toUpperCase(), c: "var(--l-otra)" };
    }

    function render() {
        list.innerHTML = "";
        data.candidatos.forEach(function(c, i) {
            var car = careerOf(c);
            var li = document.createElement("li"); li.className = "pass"; li.style.setProperty("--c", car.c);
            li.innerHTML =
                '<div class="pass__tools">' +
                    '<button class="tool" type="button" data-act="up" data-i="' + i + '" aria-label="Mover antes"' + (i === 0 ? ' disabled' : '') + '>' + ICON.up + '</button>' +
                    '<button class="tool" type="button" data-act="down" data-i="' + i + '" aria-label="Mover después"' + (i === data.candidatos.length - 1 ? ' disabled' : '') + '>' + ICON.down + '</button>' +
                    '<button class="tool" type="button" data-act="edit" data-i="' + i + '" aria-label="Editar ' + esc(c.nombre) + '">' + ICON.edit + '</button>' +
                    '<button class="tool tool--danger" type="button" data-act="del" data-i="' + i + '" aria-label="Eliminar ' + esc(c.nombre) + '">' + ICON.del + '</button>' +
                '</div>' +
                '<div class="pass__photo">' + (c.foto ? '<img src="' + esc(c.foto) + '" alt="Foto de ' + esc(c.nombre) + '" loading="lazy">' : '<span class="ph">' + ICON.person + '</span>') + '</div>' +
                '<div class="pass__band" aria-hidden="true"></div>' +
                '<div class="pass__body">' +
                    (c.cargo ? '<span class="pass__role">' + esc(c.cargo) + '</span>' : '') +
                    '<span class="pass__name">' + esc(c.nombre) + '</span>' +
                    '<span class="pass__career"><span class="bul' + (car.light ? ' bul--light' : '') + '" style="--c:' + car.c + '">' + esc(car.l) + '</span>Ingeniería ' + esc(car.name) + '</span>' +
                    (c.descripcion ? '<p class="pass__bio">' + esc(c.descripcion) + '</p>' : '') +
                '</div>';
            list.appendChild(li);
        });
        
        if (EDIT) {
            var add = document.createElement("li"); add.className = "add-slot";
            add.innerHTML = '<button type="button" data-act="add">' + ICON.plus + 'Agregar candidato</button>';
            list.appendChild(add);
        }
        
        empty.hidden = data.candidatos.length > 0;
        
        var sliderControls = document.querySelector(".slider-controls");
        if (sliderControls) {
            sliderControls.style.display = data.candidatos.length > 0 ? "" : "none";
        }

        var img = document.getElementById("mascotImg"), fig = document.getElementById("mascot");
        if (data.mascota) { img.src = data.mascota; fig.classList.remove("is-empty"); } 
        else { fig.classList.add("is-empty"); }
    }

    document.getElementById("mascotImg").addEventListener("error", function() { document.getElementById("mascot").classList.add("is-empty"); });
    document.getElementById("mascotImg").addEventListener("load", function() { document.getElementById("mascot").classList.remove("is-empty"); });

    /* ---------- Edit mode ---------- */
    var dlg = document.getElementById("dlg"), form = document.getElementById("candForm"), editing = -1, pendingPhoto = null;
    var fName = document.getElementById("fName"), fRole = document.getElementById("fRole"), fCareer = document.getElementById("fCareer"), fOther = document.getElementById("fOther"), fOtherWrap = document.getElementById("fOtherWrap"), fBio = document.getElementById("fBio"), fPhoto = document.getElementById("fPhoto"), fPreview = document.getElementById("fPreview"), fNameErr = document.getElementById("fNameErr"), fBioCount = document.getElementById("fBioCount");

    CAREERS.forEach(function(c) { var o = document.createElement("option"); o.value = c.id; o.textContent = "Ingeniería " + c.name; fCareer.appendChild(o); });
    var oo = document.createElement("option"); oo.value = "otra"; oo.textContent = "Otra carrera"; fCareer.appendChild(oo);
    
    fCareer.addEventListener("change", function() { fOtherWrap.hidden = fCareer.value !== "otra"; });
    fBio.addEventListener("input", function() { fBioCount.textContent = fBio.value.length + " / 320"; });

    function setPreview(src) {
        if (src) { fPreview.style.backgroundImage = "url('" + src + "')"; fPreview.innerHTML = ""; } 
        else { fPreview.style.backgroundImage = ""; fPreview.innerHTML = ICON.person; }
    }

    function openForm(i) {
        editing = i;
        var c = i >= 0 ? data.candidatos[i] : {}; pendingPhoto = c.foto || null;
        document.getElementById("dlgTitle").textContent = i >= 0 ? "Editar candidato" : "Agregar candidato";
        fName.value = c.nombre || ""; fRole.value = c.cargo || ""; fCareer.value = c.carrera || (c.carreraOtra ? "otra" : "sistemas"); fOther.value = c.carreraOtra || ""; fOtherWrap.hidden = fCareer.value !== "otra";
        fBio.value = c.descripcion || ""; fBioCount.textContent = fBio.value.length + " / 320"; fPhoto.value = ""; setPreview(pendingPhoto);
        fName.removeAttribute("aria-invalid"); fNameErr.textContent = "";
        dlg.showModal(); fName.focus();
    }

    function resizeImage(file, max, type, q) {
        return new Promise(function(res, rej) {
            var r = new FileReader(); r.onerror = rej; r.onload = function() {
                var im = new Image(); im.onerror = function() { rej(new Error("img")); }; im.onload = function() {
                    var s = Math.min(1, max / Math.max(im.width, im.height)), w = Math.round(im.width * s), h = Math.round(im.height * s);
                    var cv = document.createElement("canvas"); cv.width = w; cv.height = h; var cx = cv.getContext("2d");
                    if (type === "image/jpeg") { cx.fillStyle = "#fff"; cx.fillRect(0, 0, w, h); }
                    cx.drawImage(im, 0, 0, w, h); res(cv.toDataURL(type, q));
                }; im.src = r.result;
            }; r.readAsDataURL(file);
        });
    }

    fPhoto.addEventListener("change", function() {
        var f = fPhoto.files[0]; if (!f) return;
        if (!/^image\//.test(f.type)) { toast("Ese archivo no es una imagen. Prueba con JPG o PNG."); return; }
        resizeImage(f, 720, "image/jpeg", .84).then(function(u) { pendingPhoto = u; setPreview(u); }).catch(function() { toast("No se pudo leer la imagen. Prueba con otra foto."); });
    });
    
    document.getElementById("fCancel").addEventListener("click", function() { dlg.close(); });
    
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        if (!fName.value.trim()) { fName.setAttribute("aria-invalid", "true"); fNameErr.textContent = "Escribe el nombre del candidato."; fName.focus(); return; }
        var c = { nombre: fName.value.trim(), cargo: fRole.value.trim(), carrera: fCareer.value === "otra" ? "" : fCareer.value, carreraOtra: fCareer.value === "otra" ? fOther.value.trim() : "", descripcion: fBio.value.trim(), foto: pendingPhoto || "" };
        if (editing >= 0) data.candidatos[editing] = c; else data.candidatos.push(c);
        dlg.close(); saveDraft(); render(); toast(editing >= 0 ? "Candidato actualizado." : "Candidato agregado. Recuerda descargar la página al terminar.");
    });

    list.addEventListener("click", function(e) {
        var b = e.target.closest("[data-act]"); if (!b || !EDIT) return;
        var i = +b.getAttribute("data-i"), a = b.getAttribute("data-act");
        if (a === "add") openForm(-1);
        else if (a === "edit") openForm(i);
        else if (a === "del") { if (confirm("¿Eliminar a " + data.candidatos[i].nombre + " de la página?")) { data.candidatos.splice(i, 1); saveDraft(); render(); toast("Candidato eliminado."); } }
        else if (a === "up" && i > 0) { var t = data.candidatos[i - 1]; data.candidatos[i - 1] = data.candidatos[i]; data.candidatos[i] = t; saveDraft(); render(); }
        else if (a === "down" && i < data.candidatos.length - 1) { var t2 = data.candidatos[i + 1]; data.candidatos[i + 1] = data.candidatos[i]; data.candidatos[i] = t2; saveDraft(); render(); }
    });

    document.getElementById("eAdd").addEventListener("click", function() { openForm(-1); });
    
    var mf = document.getElementById("eMascotFile");
    document.getElementById("eMascot").addEventListener("click", function() { mf.click(); });
    mf.addEventListener("change", function() {
        var f = mf.files[0]; if (!f) return;
        resizeImage(f, 900, "image/png").then(function(u) { data.mascota = u; saveDraft(); render(); toast("Mascota actualizada."); }).catch(function() { toast("No se pudo leer la imagen de la mascota."); });
        mf.value = "";
    });

    function download(name, content, type) {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([content], { type: type }));
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    }

    document.getElementById("eDownload").addEventListener("click", function() {
        var json = JSON.stringify(data).replace(/</g, "\\u003c");
        var out = ORIGINAL.replace(/(<script id="datos" type="application\/json">)[\s\S]*?(<\/script>)/, function(m, a, b) { return a + json + b; });
        download("index.html", out, "text/html");
        try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
        toast("Listo. Sube este index.html a tu hosting y reemplaza el anterior.");
    });

    document.getElementById("eExport").addEventListener("click", function() { download("link-datos.json", JSON.stringify(data, null, 2), "application/json"); });

    var imf = document.getElementById("eImportFile");
    document.getElementById("eImport").addEventListener("click", function() { imf.click(); });
    imf.addEventListener("change", function() {
        var f = imf.files[0]; if (!f) return;
        var r = new FileReader();
        r.onload = function() {
            try { var d = JSON.parse(r.result); if (!Array.isArray(d.candidatos)) throw 0; data = d; saveDraft(); render(); toast("Datos importados."); } 
            catch (e) { toast("Ese archivo no tiene el formato de datos de LINK."); }
        };
        r.readAsText(f); imf.value = "";
    });

    var toastEl = document.getElementById("toast"), toastT;
    function toast(msg) {
        toastEl.textContent = msg; toastEl.hidden = false; clearTimeout(toastT);
        toastT = setTimeout(function() { toastEl.hidden = true; }, 3800);
    }

    document.getElementById("shareBtn").addEventListener("click", function() {
        var u = location.href.replace(/[?&]editar\b/, "");
        if (navigator.share) { navigator.share({ title: "LINK · Conectamos Ingeniería", url: u }).catch(function() {}); } 
        else if (navigator.clipboard) { navigator.clipboard.writeText(u).then(function() { toast("Enlace copiado."); }, function() { toast(u); }); } 
        else toast(u);
    });

    render();

    /* ---------- Route rail + sign ---------- */
    var sections = [].slice.call(document.querySelectorAll("main > section[data-station]"));
    var stops = document.getElementById("railStops"), rail = document.querySelector(".rail");
    var stopEls = sections.map(function(s) {
        var li = document.createElement("li");
        li.className = "rail__stop";
        li.innerHTML = '<a href="#' + s.id + '" aria-label="' + s.dataset.station + '"></a><span aria-hidden="true">' + s.dataset.station + '</span>';
        stops.appendChild(li);
        return li;
    });

    var signStation = document.getElementById("signStation"), signNext = document.getElementById("signNext"), root = document.documentElement, current = -1;

    function layoutStops() {
        var max = document.documentElement.scrollHeight - innerHeight;
        sections.forEach(function(s, i) {
            var t = max > 0 ? Math.min(1, Math.max(0, (s.offsetTop - 0) / max)) : 0;
            stopEls[i].style.top = (t * 100) + "%";
        });
        var h = stops.getBoundingClientRect().height;
        rail.style.setProperty("--rail-h", h + "px");
    }

    function onScroll() {
        var max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
        root.style.setProperty("--p", p.toFixed(4));
        var mark = scrollY + innerHeight * .38, idx = 0;
        sections.forEach(function(s, i) { if (s.offsetTop <= mark) idx = i; });
        if (scrollY >= max - 2) idx = sections.length - 1;
        if (idx !== current) {
            current = idx;
            signStation.textContent = sections[idx].dataset.station;
            signStation.classList.remove("is-swap"); void signStation.offsetWidth; signStation.classList.add("is-swap");
            var nx = sections[idx + 1];
            signNext.innerHTML = nx ? 'Próxima: <b>' + nx.dataset.station + '</b>' : '<b>Fin de la ruta</b>';
            stopEls.forEach(function(li, i) { li.classList.toggle("is-current", i === idx); li.classList.toggle("is-passed", i < idx); });
        }
    }

    var ticking = false;
    addEventListener("scroll", function() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(function() { onScroll(); ticking = false; });
        }
    }, { passive: true });
    
    addEventListener("resize", function() { layoutStops(); onScroll(); });
    addEventListener("load", function() { layoutStops(); onScroll(); });
    layoutStops(); onScroll();

    /* ---------- Reveal ---------- */
    var reveals = [].slice.call(document.querySelectorAll(".reveal"));
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function(es) {
            es.forEach(function(e) {
                if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
        reveals.forEach(function(r) { io.observe(r); });
    } else {
        reveals.forEach(function(r) { r.classList.add("is-in"); });
    }
    document.addEventListener("DOMContentLoaded", function() {
    const track = document.getElementById("cands");
    const btnPrev = document.getElementById("prevCand");
    const btnNext = document.getElementById("nextCand");

    if (track && btnPrev && btnNext) {
        // Al hacer clic en Anterior
        btnPrev.addEventListener("click", function() {
            if (track.children.length > 0) {
                // Calcula el ancho de la tarjeta + el espacio (gap)
                const cardWidth = track.children[0].offsetWidth;
                const gap = parseFloat(getComputedStyle(track).gap) || 0;
                track.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
            }
        });

        // Al hacer clic en Siguiente
        btnNext.addEventListener("click", function() {
            if (track.children.length > 0) {
                const cardWidth = track.children[0].offsetWidth;
                const gap = parseFloat(getComputedStyle(track).gap) || 0;
                track.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
            }
        });
    }
});
})();