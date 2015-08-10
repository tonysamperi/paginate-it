/**
	paginateIt by Tony Samperi 2015
**/
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
                                '<a class="paginator-prev">&lt; </a> '+
                                '<span>pagina</span> <span class="currentPage"></span>'+
                                '<span>di</span><span class="totalPages"></span>'+
                                '<a class="paginator-next">&gt;</a>'+
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
