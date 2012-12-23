//Globals
var buttonIsDisabled = false;
var buttonId;
var originalText;
var originalHref;
var applicationPath = "";

//Runs after every initial page load or full postback.
$(document).ready(function () {
    //Load the menu.
    $('#menu').supersubs({
        minWidth: 13,   //Minimum width of sub-menus in em units 
        maxWidth: 27,   //Maximum width of sub-menus in em units 
        extraWidth: 1   //Extra width can ensure lines don't sometimes turn over due to slight rounding differences and font-family 
    }).superfish();

    //Prepare the popup links.
    $("a.fancyLink").fancybox({
        'transitionIn': 'fade',
        'transitionOut': 'fade',
        'speedIn': 600,
        'speedOut': 600,
        'hideOnOverlayClick': false,
        'showCloseButton': false
    });

    //Prepare the popup links.
    $("#fancyLinkLogin").fancybox({
        'transitionIn': 'fade',
        'transitionOut': 'fade',
        'speedIn': 600,
        'speedOut': 600,
        'modal': true
    });

    $(window).scroll(function () {
        moveScrollingObjects();
    });

    //Pre-load images.
    preloadImages();

    //Enable the disabled button.
    if (buttonIsDisabled) {
        resetButton();
    }
});

function moveScrollingObjects() {
    var windowPosition = getYScrollPosition();
    
    if (windowPosition >= 135) {
        $(".timer").addClass("scrolling");
    } else {
        $(".timer").removeClass("scrolling");
    }
}

function getYScrollPosition() {
    var scrOfY = 0;

    if (typeof (window.pageYOffset) == 'number') {
        //Netscape compliant
        scrOfY = window.pageYOffset;
    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
    }

    return scrOfY;
}

function showDeleteWarning() {
    if (!confirm('¿Está seguro que desea eliminar el registro?')) {
        return false;
    }
}

//Runs after every ASP partial postback.
function EndRequestHandler(sender, args) {
    //Handle javascript errors.
    if (args.get_error() != undefined) {
        $("#pnlMessage").addClass("errorPanel");
        $("#lblMessage").text("Error: La petición no pudo terminar exitosamente. Intente de nuevo.");
        showMessage();
        args.set_errorHandled(true);
    }
    
    if (buttonIsDisabled == true) {
        resetButton();
    }
}

function showMessage() {
    $("#pnlMessage").css("position", "relative");
    $("#pnlMessage").animate(
        { top: '+=81' },
        { duration: 750, easing: "easeInQuint" }
    );

    setTimeout(function () { clearMessage(); }, 4250);
}

function clearMessage() {
    $("#pnlMessage").animate(
        { top: '-=81' },
        { duration: 750, easing: "easeInQuint" }
    );
}

function redirectWithTransition(sender, doPostBack, url) {
    setTimeout(function () {
        if (doPostBack) {
            __doPostBack(sender.name, '');
        } else {
            window.location = applicationPath + url;
        }
    }, 1000);

    transitionSite();
}

function hidePanel(panelId) {
    $("#" + panelId).animate(
        { top: '-=4000' },
        { duration: 1000, easing: "easeInQuint" }
    );

    setTimeout(function () {
        $("#" + panelId).addClass("invisible");
        $("#" + panelId).addClass("hidden");
        $("#" + panelId).attr("style", "");
    }, 1100);
}

function showPanel(panelId) {
    $("#" + panelId).removeClass("invisible");
    $("#" + panelId).animate(
        { top: '+=4000' },
        { duration: 1000, easing: "easeOutQuint" }
    );

    setTimeout(function () {
        $("#" + panelId).removeClass("hidden");
        $("#" + panelId).attr("style", "");
    }, 1100);
}

function transitionSite() {
    $("#pnlContent").css("position", "relative");
    $("#pnlContent").animate(
        { top: '-=2000' },
        { duration: 1000, easing: "easeInQuint" }
    );

    $(".siteMessagePanel").animate(
        { top: '-=2000' },
        { duration: 1000, easing: "easeInQuint" }
    );
}

function disableButton(button, validationGroup) {
    if (!buttonIsDisabled) {
        if (typeof (Page_ClientValidate) != "undefined") {
            Page_ClientValidate(validationGroup);
        } else {
            Page_IsValid = true;
        }

        if (Page_IsValid) {
            //Store the button's information temporarily.
            buttonIsDisabled = true;
            buttonId = button.id;
            originalText = button.innerHTML;
            originalHref = button.href;

            //Change the button's text and disable it.
            button.href = "javascript:void(0);";
            button.innerHTML = "&nbsp;";
            $("#" + buttonId).addClass("disabled");
            eval(unescape(originalHref.replace("javascript:", "")));
        }
    }
}

function resetButton() {
    button = $("#" + buttonId);

    if (button != null) {
        button.text(originalText);
        button.attr("href", originalHref)
        button.removeClass("disabled");
        buttonIsDisabled = false;
    }
}

function SetRegularToolTip(button) {
    button.title = button.getAttribute('regularToolTip');
}

//Code to allow custom selection in RadListBoxes.
var flag;

function OnClientItemChecked(sender, args) {
    if (!flag) {
        var item = args.get_item();
        flag = true;

        if (item.get_selected()) {
            item.unselect();
        } else {
            item.select();
        }

        flag = false;
    }
}

function OnClientSelectedIndexChanged(sender, args) {
    if (!flag) {
        flag = true;
        var item = args.get_item();

        if (item.get_checked()) {
            item.uncheck();
            item.unselect();
        } else {
            item.check();
        }

        selectCheckedItems(item.get_listBox());
        flag = false;
    }
}

function selectCheckedItems(listbox) {
    if (listbox) {
        var items = listbox.get_checkedItems();

        for (var i in items) {
            items[i].select();
        }
    }
}

function preloadImages() {
    //All the images to be pre-loaded.
    imageURLs = new Array();
    imageURLs[0] = applicationPath + "/Images/Collapse.png";
    imageURLs[1] = applicationPath + "/Images/SortAsc.png";
    imageURLs[2] = applicationPath + "/Images/SortDesc.png";
    imageURLs[3] = applicationPath + "/Images/Icons/Close.png";
    imageURLs[4] = applicationPath + "/Images/Icons/Save.png";
    imageURLs[5] = applicationPath + "/Images/Icons/Cancel.png";
    imageURLs[6] = applicationPath + "/Images/First.png";
    imageURLs[7] = applicationPath + "/Images/Prev.png";
    imageURLs[8] = applicationPath + "/Images/Next.png";
    imageURLs[9] = applicationPath + "/Images/Last.png";

    //Set the src attribute of the dummy image to download them.
    dummyImage = new Image();
    for (i = 0; i < imageURLs.length; i++) {
        dummyImage.src = imageURLs[i];
    }
}

/* 
---
Insert project-specific code after this mark 
---
*/

function disableChatButton(button, validationGroup) {
    if (!buttonIsDisabled) {
        if (typeof (Page_ClientValidate) != "undefined") {
            Page_ClientValidate(validationGroup);
        } else {
            Page_IsValid = true;
        }

        if (Page_IsValid) {
            //Store the button's information temporarily.
            buttonIsDisabled = true;
            buttonId = button.id;
            originalText = button.innerHTML;
            originalHref = button.href;

            //Change the button's text and disable it.
            button.href = "javascript:void(0);";
            button.innerHTML = "Estas en la fila, por favor espera...";
            $("#" + buttonId).addClass("disabledChat");
            eval(unescape(originalHref.replace("javascript:", "")));
        }
    }
}