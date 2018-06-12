/**
 *	paginateIt by Tony Samperi 2018
 */
var style = "\
 div.paginator {\
	display: block;\
	float: left;\
	width: 100%;\
	clear: both;\
 }\
 \
 div.paginator:after {\
	display: table;\
 }\
 \
 span.paginator-prev,\
 span.paginator-next {\
	cursor: pointer;\
	color: #18bc9c;\
	-webkit-user-select: none; /* Safari 3.1+ */\
    -moz-user-select: none; /* Firefox 2+ */\
    -ms-user-select: none; /* IE 10+ */\
    user-select: none; /* Standard syntax */\
 }\
 \
 span.paginator-prev:hover,\
 span.paginator-next:hover {\
	font-weight: bold;\
 }\
";
 
"undefined" != typeof document && function(e, t) {
    var n = e.createElement("style");
    if (e.getElementsByTagName("head")[0].appendChild(n),
    n.styleSheet)
        n.styleSheet.disabled || (n.styleSheet.cssText = t);
    else
        try {
            n.innerHTML = t
        } catch (e) {
            n.innerText = t
        }
}(document, style);
 
$.paginateIt = function ($target, $count) {
    var self = this;
    this.fullData = $target.children().clone();
    this.visibleData = "";
    this.total = this.fullData.length;
    this.page = 1;
    this.count = $count || 10;
    this.totalPages = Math.ceil(this.total / this.count);
    //PAGINATOR
    this.paginatorTemplate = '<div class="row paginator">'+
                        '<div class="col-lg-9 col-md-8 col-sm-7 col-xs-6"></div>'+
                        '<div class="col-lg-3 col-md-4 col-sm-5 col-xs-6">'+
                           '<div class="pull-right">'+
                                '<span class="paginator-prev">&lt; </span> '+
                                '<span>page</span> <span class="currentPage"></span>'+
                                '<span>&nbsp;of&nbsp;</span><span class="totalPages"></span>'+
                                '<span class="paginator-next"> &gt;</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
    $(this.paginatorTemplate).insertAfter($target);
    this.paginator = $target.next();
    this.pagCurrent = self.paginator.find(".currentPage");
    this.pagTotal = self.paginator.find(".totalPages");
    this.pagNext = self.paginator.find(".paginator-next");
    this.pagPrev = self.paginator.find(".paginator-prev");
    this.pagNext.on("click", function () {
        self.nav("next");
    });
    this.pagPrev.on("click", function () {
        self.nav("prev");
    });
    this.nav = function (action) {
        switch (action) {
            case "prev":
                if (this.page > 1) {
                    this.page--;
                    self.visibleData = self.fullData.slice((self.page - 1) * self.count, self.page * self.count);
                    $target.empty().append(self.visibleData);
                    self.pagCurrent.text(self.page);
                    self.pagTotal.text(self.totalPages);
                }
                break;
            case "next":
                if (this.page < this.totalPages) {
                    this.page++;
                    self.visibleData = self.fullData.slice((self.page - 1) * self.count, self.page * self.count);
                    $target.empty().append(self.visibleData);
                    self.pagCurrent.text(self.page);
                    self.pagTotal.text(self.totalPages);
                }
                break;
            case "boot":
                self.visibleData = self.fullData.slice((self.page - 1) * self.count, self.page * self.count);
                $target.empty().append(self.visibleData);
                self.pagCurrent.text(self.page);
                self.pagTotal.text(self.totalPages);
			    $target.find("img:last").on("load", function(){
			    	$target.css("minHeight", $target.height());
			    });
				break;
            default:
                console.error("WRONG ACTION!");
                break;
        }
    };
    self.nav("boot");
};

$(document).ready(function(){
    $("[paginate]").each(function(){
        if (isNaN(parseInt($(this).attr("paginate")))) {
            console.error("invalid \"paginate\" attribute at [paginate]", $(this));
            //SKIP TO NEXT ITERATION
            return true;
        }
        var $count = parseInt($(this).attr("paginate"));
        var doPag = new $.paginateIt($(this), $count);
    });
});
