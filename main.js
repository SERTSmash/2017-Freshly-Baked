
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
	apiKey: "AIzaSyBYNkGhE41RP5bzmtKuBMryriYfEjZVoo0",
	authDomain: "sert-smash-freshly-baked.firebaseapp.com",
	databaseURL: "https://sert-smash-freshly-baked.firebaseio.com/",
	storageBucket: "gs://sert-smash-freshly-baked.appspot.com",
};

var app = firebase.initializeApp(config);

var user;

$("#pageLogin").click(function(e) {
	e.preventDefault();

	email = $("#inputEmail").val();
	password = $("#inputPassword").val();

	pageLogin(email, password);

	/* Login Checking */
	var user = firebase.auth().currentUser;


	if (user.displayName == null) {
		//Show modal setup.
		$("#setup").modal("show");
	}

	if (user != null) {
		$("#login").remove();
		animateStart();
	}
});

$("#pageRegister").click(function(e) {
	e.preventDefault();

	email = $("#inputEmail").val();
	password = $("#inputPassword").val();

	pageRegister(email, password);
});

$("#submitName").click(function(e) {
	e.preventDefault();

	teamName = $("#inputTeam").val();

	user.updateProfile({
		displayName: teamName
	});

	$("#setup").modal("hide");
});

function animateStart() {
	$("#textstuff").animate({
		opacity: "0.0"
	}, "slow");

	$("#headstuff").animate({
		height: "-=200px" 
	}, "slow");

	$("#headstuff").promise().done(function() {
	
		$("#smalltext").text("");

		$("#headstuff").animate({
			height: "+=50px"
		}, "slow");

		$("#bigtext").text("Robot Informations");
		
		$("#textstuff").animate({
			opacity: "0.75"
		}, "slow");

		appendData();
	});
}

function appendData() {
	//Append team info.
	$("#welcomeBack").text("Welcome Back Team #" + user.displayName + "!");
	$("#emailRef").text("Logged in as " + user.email);

	//Get firebase database.
	var database = firebase.database();


}

function pageLogin(email, password) {
	//Login
	firebase.auth().signInWithEmailAndPassword(email, password);

	user = firebase.auth().currentUser;
}

function pageRegister(email, password) {
	//Register
	firebase.auth().createUserWithEmailAndPassword(email, password);
}
