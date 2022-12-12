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

        setTimeout(function (){ //short delay to allow the animation for clicking to play
            window.location.href=page;
        }, 200);
    });

    /*Creates the accordion objects used for the information on the events page*/
    $("#evt-accordion").accordion({
        collapsible: true,
        heightStyle: "content"
    }); //end accordion
    $(".evt-accordion2").accordion({
        collapsible:true,
        active:false,
        heightStyle:"content",
        icons: false
    }); //end accordion


    /* The following two functions are simple calls to determine the day of the week and month of the year for
    * changing values when using the built-in date functions */
    function getMonth(month){
        month = (month % 12);
        let months = ['Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];
        return months[month];
    }//end function

    function getDayOfWeek(day){
        day = (day % 7);
        let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return weekday[day];
    }//end function

    //vairable declarations for active date updating
    var today = new Date();
    var weekday = today.getDay();
    var day = new Date(today);
    //loop to populate an updating events page to make it more dynamic using built-in date functions
    for (let i = 1; i < 13; i+=2){
        day.setMonth(today.getMonth());
        day.setDate(today.getDate() + (i - 1));
        $(".date:nth-child("+ i +")").append(getDayOfWeek(weekday) + ", " + getMonth(day.getMonth()) + " " +
            (day.getDate()));
        weekday += 2;
    }//end forloop


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
    });//end click

    /* The following functions are for the various buttons and form options on the event page*/
    //creates a popup window for signing up for an event
    $(".sign-up-btn").click(function(){
        $("#sign-up-popup").show();
        $("#sign-up-popup h3").html("Sign Up For: " + $(this).prev().html());
    });//end click

    //cancels the current signup attempt
    $("#close-popup").click(function(){
        $("#email").val("");
        $("#name").val("");
        $("#phone").val("");
        $("#sign-up-popup").hide();
    });//end click

    //submits the signup attempt
    $("#sign-up-form-btn").click(function (){
       $("#thank-message").show();
        $("#sign-up-popup").hide();
    });//end click

    //closes the thank you popup and hides the forms
    $("#close").click(function (){
        $("#email").val("");
        $("#name").val("");
        $("#phone").val("");
        $("#thank-message").hide();
    });//end click



    //jquery ajax function to get a local json file with instructor information and
    //add the information to the selected html elements iteratively
    $.getJSON("instructors.json", function(data){
        $.each(data, function (){
            $.each(this, function(){
                $("#instructors").append(
                    "<div class = 'instructors-div'>" +
                    "<h2>" + this.full_name + "</h2>" +
                    "<h3> "+ this.title +"</h3>" +
                    "<img src = '" + this.pic + "' alt = '" + this.pic_alt + "' class = '" + this.img_class + "'>" +
                    "<p>" + this.info +"</p>"+
                    "</div>"
                );
            });
        });
    }); //end of ajax

    var count =0;
    var currentDiv ="";

    //ajax function to get a json file containing the various types of yoga to be displayed
    //upon successfully getting the file, the function will iterate through all the information provided in the file and
    //append it to the appropriate elements as designated.
    $.ajax({
        type:"get",
        url: "typesOfYoga.json",
        success: function(data){
            $.each(data, function (){
                if (count === 0){
                    $(".types-of-yoga").append("<div class='types-offered'></div>");
                    currentDiv = ".types-offered";
                    $(currentDiv).append("<h2>Styles Offered</h2>");
                }
                else{
                    $(".types-of-yoga").append("<div class='types-not-offered'></div>")
                    currentDiv = ".types-not-offered"
                    $(currentDiv).append("<h2>Styles Not Offered</h2>");
                }
               $.each(this, function (){
                  $(currentDiv).append(
                      "<h3> "+ this.name +" </h3>" +
                      "<p> "+ this.description+"</p>"
                  );
               });
                count++;
            });
        }
    }); //end of ajax call

    $(".event-btn").click(function (){
        window.location.href = "events.html";
    });
});
