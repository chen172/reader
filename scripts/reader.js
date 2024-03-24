var chapters = new Array();
var fileContentArray;
var chapterNo = 0;
document.getElementById('inputfile').addEventListener('change', function () {
    let reader = new FileReader();
    reader.onload = function () {
        fileContentArray = reader.result.split(/\r\n|\n/);
        //document.getElementById('content').textContent = reader.result;
        //document.getElementById('content').textContent = fileContentArray.length;
        // get all the chapters
        var i = 0;
        for (var line = 0; line < fileContentArray.length - 1; line++) {
            if ((fileContentArray[line].indexOf('章') != -1) && (fileContentArray[line].indexOf('第') != -1)) {
                chapters[i] = line;
                document.getElementById('content').innerHTML += `<p>` + fileContentArray[line] + `</p>`;
                i++;
            }
        }
        //document.getElementById('content').innerHTML += `<p>` + chapters.length + `</p>`;        

        // first chapter
        /*for (var line = 0; line < chapters[1]; line++) {
            document.getElementById('content').innerHTML += `<p>` + fileContentArray[line] + `</p>`;
        }
        chapterNo += 1;*/        
    }

    reader.readAsText(this.files[0], "GBK");
    // default encoding: UTF-8
    //reader.readAsText(this.files[0]);
})

function nextChapter() {
    document.getElementById('content').innerHTML = '';
    for (var line = chapters[chapterNo]; line < chapters[chapterNo+1]; line++) {
        document.getElementById('content').innerHTML += `<p>` + fileContentArray[line] + `</p>`;
    }
    chapterNo += 1;
    // scroll to top
    window.scrollTo(0, 0);
}