/*var maxVolume = 10;
var chapters = new Array(maxVolume);
for (var i = 0; i < chapters.length; i++) {
    chapters[i] = new Array();
}*/
var chapters = new Array();
var fileContentArray;
var chapterNo = 0;
document.getElementById('inputfile').addEventListener('change', function () {
    let reader = new FileReader();
    reader.onload = function () {
        fileContentArray = reader.result.split(/\r\n|\n/);
        //document.getElementById('content').textContent = reader.result;
        //document.getElementById('content').textContent = fileContentArray.length;
        document.getElementById('content').innerHTML = '';
        chapters.length = 0;

        // get all the volumes
        var volumes = new Array();
        var volumeNo = 0;
        for (var line = 0; line < fileContentArray.length - 1; line++) {
            var subString1 = '第' + toChinese(volumeNo+1) + '卷';
            var subString2 = '第一章';
            // restrict check
            if (fileContentArray[line].indexOf(subString1) != -1) {
                if ((fileContentArray[line].indexOf(subString2) != -1) || (fileContentArray[line+1].indexOf(subString2) != -1)) {
                volumes[volumeNo] = line;
                //document.getElementById('content').innerHTML += '<button'+' id='+volumeNo+' onclick="jumpChapter(this.id)">'+fileContentArray[line]+'</button>'+'<br>';
                volumeNo++;
                }
            }
        }
        // No volume
        if (volumeNo == 0) {
            volumes[volumeNo] = 0;
            volumeNo++;
        }
        // last line, end of the book
        volumes[volumeNo] = fileContentArray.length - 1;

        // get all the chapters from the book
        var i = 0;
        for (var j = 0; j < volumeNo; j++) {
            // volume name
            //document.getElementById('content').innerHTML += '<p>'+fileContentArray[volumes[j]]+'</p>';
            // real chapter number
            var no = 0;
            // get all the chapters from the volume
            for (var line = volumes[j]; line < volumes[j+1]; line++) {
                // check repeat chapter
                var subString1 = '第' + toChinese(no) + '章';
                var subString11 = no + '章';
                var index1 = fileContentArray[line].indexOf(subString1);
                var index11 = fileContentArray[line].indexOf(subString11);
                // check next chapter
                var subString2 = '第' + toChinese(no+1) + '章';
                var subString22 = (no+1) + '章';
                var index2 = fileContentArray[line].indexOf(subString2);
                var index22 = fileContentArray[line].indexOf(subString22);
                // check next next chapter
                var subString3 = '第' + toChinese(no+2) + '章';
                var subString33 = (no+2) + '章';
                var index3 = fileContentArray[line].indexOf(subString3);
                var index33 = fileContentArray[line].indexOf(subString33);
                // allow repeat, missing 1 chapter
                if ((index2 != -1) || (index22 != -1)) {
                    chapters[i] = line;
                    document.getElementById('content').innerHTML += '<button'+' id='+i+' onclick="jumpChapter(this.id)">'+fileContentArray[line]+'</button>'+'<br>';
                    no++;
                    i++;
                } else if ((index1 != -1) || (index11 != -1)) {
                    chapters[i] = line;
                    document.getElementById('content').innerHTML += '<button'+' id='+i+' onclick="jumpChapter(this.id)">'+fileContentArray[line]+'</button>'+'<br>';
                    i++;
                } else if ((index3 != -1) || (index33 != -1)) {
                    chapters[i] = line;
                    document.getElementById('content').innerHTML += '<button'+' id='+i+' onclick="jumpChapter(this.id)">'+fileContentArray[line]+'</button>'+'<br>';
                    no += 2;
                    i++;              
                } else {
                // do nothing
                }
            }
        }
        // last line, end of the book
        var maxParagraphys = 1000
        if ((fileContentArray.length-chapters[i-1]) > maxParagraphys) {
            // Too may paragraphys
            chapters[i] = chapters[i-1] + maxParagraphys;
        } else {
            chapters[i] = fileContentArray.length;
        }
        //document.getElementById('content').innerHTML += `<p>` + chapters.length + `</p>`;        

        // first chapter
        /*for (var line = 0; line < chapters[1]; line++) {
            document.getElementById('content').innerHTML += `<p>` + fileContentArray[line] + `</p>`;
        }
        chapterNo += 1;*/        
    }

    languageEncoding(this.files[0]).then((fileInfo) => {
        if(fileInfo.encoding == "UTF-8")
            reader.readAsText(this.files[0]);
        else
            reader.readAsText(this.files[0], "GBK");
    });
})

function preChapter() {
    // No previous chapter anymore
    if (chapterNo == 1)
        return;
    document.getElementById('content').innerHTML = '';
    // chapter name
    document.getElementById('content').innerHTML += `<p style="text-align:center">` + fileContentArray[chapters[chapterNo-2]] + `</p>`;
    for (var line = chapters[chapterNo-2]+1; line < chapters[chapterNo-1]; line++) {
        document.getElementById('content').innerHTML += `<p>` + fileContentArray[line] + `</p>`;
    }
    chapterNo -= 1;
    // scroll to top
    window.scrollTo(0, 0);
}

function nextChapter() {
    // No next chapter anymore
    if (chapterNo == (chapters.length-1))
        return;
    document.getElementById('content').innerHTML = '';
    // chapter name
    document.getElementById('content').innerHTML += `<p style="text-align:center">` + fileContentArray[chapters[chapterNo]] + `</p>`;
    for (var line = chapters[chapterNo]+1; line < chapters[chapterNo+1]; line++) {
        document.getElementById('content').innerHTML += `<p>` + fileContentArray[line] + `</p>`;
    }
    chapterNo += 1;
    // scroll to top
    window.scrollTo(0, 0);
}

function jumpChapter(id) {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML += `<p style="text-align:center">` + fileContentArray[chapters[id]] + `</p>`;
    for (var line = chapters[id]+1; line < chapters[Number(id)+1]; line++) {
        document.getElementById('content').innerHTML += `<p>` + fileContentArray[line] + `</p>`;
    }
    chapterNo = Number(id)+1;
    // scroll to top
    window.scrollTo(0, 0);
}

function catalog() {
    document.getElementById('content').innerHTML = '';
    for (var i = 0; i < (chapters.length-1); i++)
        document.getElementById('content').innerHTML += '<button'+' id='+i+' onclick="jumpChapter(this.id)">'+fileContentArray[chapters[i]]+'</button>'+'<br>';
    window.scrollTo(0, 0);
}

function pageRead() {
    var i = 0;
    var page = 50;
    for (var line = 0; line < fileContentArray.length - 1; line += page) {
        chapters[i] = line;
        i++;
    }
    nextChapter();
}

// From https://github.com/ouxingzhi/toChinese
  var toChinese = function() {
    var UnitMap = {
        0 : '零',
        1 : '一',
        2 : '二',
        3 : '三',
        4 : '四',
        5 : '五',
        6 : '六',
        7 : '七',
        8 : '八',
        9 : '九'
    },
    BigUnitMap = {
        10 : '十',
        100 : '百',
        1000 : '千'
    };
    function getUnit(num) {
        var n = num.toString().split('');
        var units = function(n) {
            var ns = [];
            for (var i = 0,
            I = n.length; i < I; i++) {
                ns.push({
                    Unit: n[i],
                    BigUnit: ('1' + Array(I - i).join('0'))
                })
            }
            return ns
        } (n);
        var str = "",
        last;
        for (var i = 0,
        I = units.length; i < I; i++) {
            if (last != '0' || units[i].Unit != '0') {
                str +=
                function() {
                    var list = n.slice(i).join('');
                    if (i != 0 && list.match(/^0+$/i)) return '';
                    if (i == 0 && units[i].BigUnit == '10' && units[i].Unit == '1') return '';
                    return UnitMap[units[i].Unit]
                } () + (units[i].Unit != '0' && typeof BigUnitMap[units[i].BigUnit] != 'undefined' ? BigUnitMap[units[i].BigUnit] : '');
                last = units[i].Unit
            }
        }
        return str
    };
    return function(num) {
        num = num || 0;
        var str = num.toString().split('').reverse().join(''),
        reg = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/i,
        ex = reg.exec(str);
        var qian, wang, yi;
        if (ex[1]) qian = ex[1].split('').reverse().join('');
        if (ex[2]) wang = ex[2].split('').reverse().join('');
        if (ex[3]) yi = ex[3].split('').reverse().join('');
        var result = '';
        if (yi && yi.match(/[^0]/i)) {
            result = result + getUnit(yi) + '亿'
        }
        if (wang && wang.match(/[^0]/i)) {
            result = result + getUnit(wang) + '万'
        }
        if (!qian || !result || !qian.match(/^0+$/i)) {
            result = result + getUnit(qian)
        }
        return result
    }
} ();
