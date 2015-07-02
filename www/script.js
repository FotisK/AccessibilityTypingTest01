var CurChar;
var PressSum; //sum of keys pressed (1:right section -1: left section)
var PressCount; //number of keys pressed. PressSum/PressCount= "where did I click? averaged"
var TypedText;
var RetainedChar;
var Ticks;
var keyLayout;
var keyReleased;
var longString;

var keyPosition = {
   3 : 1,
   8 : 1,
   9 : -1,
   12 : 1,
   13 : 1,
   16 : 0,
   17 : -1,
   18 : -1,
   19 : 1,
   20 : -1,
   27 : -1,
   32 : 0,
   33 : 1,
   34 : 1,
   35 : 1,
   36 : 1,
   37 : 1,
   38 : 1,
   39 : 1,
   40 : 1,
   41 : 1,
   42 : 1,
   43 : 1,
   44 : 1,
   45 : 1,
   46 : 1,
   48 : -1,
   49 : -1,
   50 : -1,
   51 : -1,
   52 : -1,
   53 : -1,
   54 : 1,
   55 : 1,
   56 : 1,
   57 : 1,
   65 : -1,
   66 : 0,
   67 : -1,
   68 : -1,
   69 : -1,
   70 : -1,
   71 : 0,
   72 : 1,
   73 : 1,
   74 : 1,
   75 : 1,
   76 : 1,
   77 : 1,
   78 : 1,
   79 : 1,
   80 : 1,
   81 : -1,
   82 : -1,
   83 : -1,
   84 : -1,
   85 : 1,
   86 : -1,
   87 : -1,
   88 : -1,
   89 : 0,
   90 : -1,
   91 : -1,
   92 : 1,
   93 : 1,
   96 : 1,
   97 : 1,
   98 : 1,
   99 : 1,
   100 : 1,
   101 : 1,
   102 : 1,
   103 : 1,
   104 : 1,
   105 : 1,
   106 : 1,
   107 : 1,
   109 : 1,
   110 : 1,
   111 : 1,
   112 : -1,
   113 : -1,
   114 : -1,
   115 : -1,
   116 : -1,
   117 : 1,
   118 : 1,
   119 : 1,
   120 : 1,
   121 : 1,
   122 : 1,
   123 : 1,
   124 : 1,
   125 : 1,
   126 : 1,
   127 : 1,
   128 : 1,
   129 : 1,
   130 : 1,
   144 : 1,
   145 : 1,
   173 : 0,
   174 : 0,
   175 : 0,
   181 : 0,
   182 : 0,
   183 : 0,
   186 : 1,
   187 : 1,
   188 : 1,
   189 : 0,
   190 : 1,
   191 : 0,
   192 : 0,//"grave accent ",
   219 : 1,//"open bracket ",
   220 : 1,//"back slash ",
   221 : 1,//"close bracket ",
   222 : 1,//"single quote ",
   224 : 0,//"left or right ⌘ key (firefox)",
   225 : 1,//"altgr",
   255 : 0//"toggle touchpad"
}

var keyCodes = {
   3 : "break",
   8 : "backspace / delete",
   9 : "tab",
   12 : "clear",
   13 : "enter",
   16 : "shift",
   17 : "ctrl",
   18 : "alt",
   19 : "pause/break",
   20 : "caps lock",
   27 : "escape",
   32 : "spacebar",
   33 : "page up",
   34 : "page down",
   35 : "end",
   36 : "home ",
   37 : "left arrow ",
   38 : "up arrow ",
   39 : "right arrow",
   40 : "down arrow ",
   41 : "select",
   42 : "print",
   43 : "execute",
   44 : "Print Screen",
   45 : "insert ",
   46 : "delete",
   48 : "0",
   49 : "1",
   50 : "2",
   51 : "3",
   52 : "4",
   53 : "5",
   54 : "6",
   55 : "7",
   56 : "8",
   57 : "9",
   65 : "a",
   66 : "b",
   67 : "c",
   68 : "d",
   69 : "e",
   70 : "f",
   71 : "g",
   72 : "h",
   73 : "i",
   74 : "j",
   75 : "k",
   76 : "l",
   77 : "m",
   78 : "n",
   79 : "o",
   80 : "p",
   81 : "q",
   82 : "r",
   83 : "s",
   84 : "t",
   85 : "u",
   86 : "v",
   87 : "w",
   88 : "x",
   89 : "y",
   90 : "z",
   91 : "Windows Key / Left ⌘",
   92 : "right window key ",
   93 : "Windows Menu / Right ⌘",
   96 : "numpad 0 ",
   97 : "numpad 1 ",
   98 : "numpad 2 ",
   99 : "numpad 3 ",
   100 : "numpad 4 ",
   101 : "numpad 5 ",
   102 : "numpad 6 ",
   103 : "numpad 7 ",
   104 : "numpad 8 ",
   105 : "numpad 9 ",
   106 : "multiply ",
   107 : "add",
   109 : "subtract ",
   110 : "decimal point",
   111 : "divide ",
   112 : "f1 ",
   113 : "f2 ",
   114 : "f3 ",
   115 : "f4 ",
   116 : "f5 ",
   117 : "f6 ",
   118 : "f7 ",
   119 : "f8 ",
   120 : "f9 ",
   121 : "f10",
   122 : "f11",
   123 : "f12",
   124 : "f13",
   125 : "f14",
   126 : "f15",
   127 : "f16",
   128 : "f17",
   129 : "f18",
   130 : "f19",
   144 : "num lock ",
   145 : "scroll lock",
   173 : "mute/unmute",
   174 : "decrease volume level",
   175 : "increase volume level",
   181 : "mute/unmute (firefox)",
   182 : "decrease volume level (firefox)",
   183 : "increase volume level (firefox)",
   186 : "semi-colon ",
   187 : "equal sign ",
   188 : "comma",
   189 : "dash ",
   190 : "period ",
   191 : "forward slash",
   192 : "grave accent ",
   219 : "open bracket ",
   220 : "back slash ",
   221 : "close bracket ",
   222 : "single quote ",
   224 : "left or right ⌘ key (firefox)",
   225 : "altgr",
   255 : "toggle touchpad"
}

window.setInterval(function(){
	if (typeof window.keyLayout === "undefined") {
    	window.keyLayout = 0;
	}
	if (typeof window.Ticks === "undefined") {
    	window.Ticks = 0;
	}
	if (typeof window.CurChar === "undefined") {
    	window.CurChar = -1;
	}
	if (typeof window.TypedText === "undefined") {
    	window.TypedText = "";
	}
	if ((typeof window.PressSum === "undefined")||(typeof PressCount === "undefined")) {
    	window.PressSum=0;
		window.PressCount=0;
	}
	if ((typeof window.RetainedChar === "undefined")) {
		window.RetainedChar=-1;
	}
	if ((typeof window.longString === "undefined")) {
		window.longString = "";
	}
//$('p.keycode-display').text(keyCodes[window.CurChar]+":"+window.keyLayout);
	switch (window.keyLayout)
	{
		case 0:
			if (window.CurChar>89) {window.CurChar=64;}
			if (window.CurChar==-1) {window.CurChar=64;}		
		break;
		case 1:
			if ((window.CurChar>57)&&(window.CurChar<64)) {window.CurChar=47;}
			if (window.CurChar==-1) {window.CurChar=47;}
		break;
	}

	window.CurChar++;
	$('p.keycode-display').text(keyCodes[window.CurChar]);
   $('p.text-display').text(RetainedChar);
	//if (window.RetainedChar>0) {	
		if ((window.PressSum/window.PressCount)<0){
			
			//if (((window.RetainedChar>47)&&(window.RetainedChar<58))||((window.RetainedChar>64)&&(window.RetainedChar<91))) {
				window.TypedText+=keyCodes[window.RetainedChar];
				window.CurChar=-1;
			//}
		}
		if ((window.PressSum/window.PressCount)>0){
			if (window.TypedText.length>0){
				window.TypedText=window.TypedText.substring(0, TypedText.length - 1);
				window.CurChar=-1;
			} else {window.CurChar=-1;}
		}
		$('p.longstring').text(window.TypedText);
		window.PressSum=0;
		window.PressCount=0;
	//}
   //window.RetainedChar=-1;
},750);


$(function(){
  $( ".character" ).bind( "click tap", commitchar );
  $( "#buttonbackspace" ).bind( "click tap", deletechar );
  $( "#buttonback" ).bind( "click tap", switchlayout );
  $( "#buttonforward" ).bind( "click tap", addspace);
   
   function addspace(e) {
      if (typeof window.TypedText === "undefined") {
         window.TypedText = "";
      }
      window.longString=window.TypedText+" "+window.longString;
      $('p.bigtext').text("Text:" + window.longString);
      window.TypedText="";
      window.CurChar=-1;
   }
   function switchlayout(e) {
      if (typeof window.keyLayout === "undefined") {
         window.keyLayout=1;
      }else {
         window.keyLayout++;
         if (window.keyLayout>1) {
            window.keyLayout=0;
         }
      }
      window.CurChar=-1;
      window.RetainedChar=-1;
  }


   function deletechar(e){
      if (typeof window.CurChar === "undefined") {
         window.CurChar = -1;
      }
      if (typeof window.TypedText === "undefined") {
         window.TypedText = "";
      }
      if ((typeof window.PressSum === "undefined")||(typeof window.PressCount === "undefined")) {
         window.PressSum=0;
         window.PressCount=0;
      }
      //if( !e.metaKey ) {
      //   e.preventDefault();
      //}
      window.PressSum++;
      window.PressCount++;
      //$('p.longstring').text(PressSum/PressCount || 0);
   }


   function commitchar(e){
     	if (typeof window.CurChar === "undefined") {
       	window.CurChar = -1;
   	}
   	if (typeof window.TypedText === "undefined") {
       	window.TypedText = "";
   	}
   	if ((typeof window.PressSum === "undefined")||(typeof window.PressCount === "undefined")) {
       	window.PressSum=0;
   		window.PressCount=0;
   	}
/*   	if( !e.metaKey ) {
         e.preventDefault();
       }*/
       if (window.CurChar>0) {
   	    window.RetainedChar=window.CurChar;
   	    window.document.title=window.Ticks+"-"+window.CurChar+"-"+window.RetainedChar;

   	    	window.PressSum--;
   	    	window.PressCount++;
   	}
   }
});
