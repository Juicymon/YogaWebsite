$(document).ready(function (){

    $(".top-nav").scrollupbar(); //allows the navbar to be hidden and return based on user scrolling

    /* Button click events on the homepage to decide which page to change to */
    $(".home-container button").click(function(){
        let page ="";
        if($(this).attr("id") == "yoga-btn")
            page ="types-of-yoga.html";
        else if ($(this).attr("id") == "event-btn")
            page ="events.html";
        else if ($(this).attr("id") == "instruct-btn")
            page ="contact.html";

        setTimeout(function (){
            window.location.href=page;
        }, 200);
    });

    /*Creates the accordion objects used for the information on the events page*/
    $("#evt-accordion").accordion({
        collapsible: true,
        heightStyle: "content"
    });
    $(".evt-accordion2").accordion({
        collapsible:true,
        active:false,
        heightStyle:"content",
        icons: false
    });


    /* the following function changes header text in the sub-accordions
    on the events page by toggling their class and checking */
    $(".evt-accordion2 h3").click(function(){
        $(this).toggleClass("active-header");
        if ($(this).hasClass("active-header")){
            $(this).text("- Less Info");
        }

        else {
            $(this).text("+ More Info");
        }
    });

    /* The following functions are for the various buttons and form options on the event page*/
    //creates a popup window for signing up for an event
    $(".sign-up-btn").click(function(){
        $("#sign-up-popup").show();
        $("#sign-up-popup h3").html("Sign Up For: " + $(this).prev().html());
    });

    //cancels the current signup attempt
    $("#close-popup").click(function(){
        $("#email").val("");
        $("#name").val("");
        $("#phone").val("");
        $("#sign-up-popup").hide();
    });

    //submits the signup attempt
    $("#sign-up-form-btn").click(function (){
       $("#thank-message").show();
        $("#sign-up-popup").hide();
    });

    //closes the thank you popup and hides the forms
    $("#close").click(function (){
        $("#email").val("");
        $("#name").val("");
        $("#phone").val("");
        $("#thank-message").hide();
    });
});
