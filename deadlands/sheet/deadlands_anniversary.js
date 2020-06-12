function openPage(evt, pageName) {
  // Declare all variables
  var i, tabcontent, tablinks, pagetarget;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("sheet-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("sheet-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" sheet-active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
	pagetarget = document.getElementsByClassName(pageName);
	for (i = 0; i < pagetarget.length; i++)	{
		pagetarget[i].style.display = "block";
	}  
  evt.currentTarget.className += " sheet-active";
}// JavaScript Document