
// Initialize Firebase
var config = {
	apiKey: "AIzaSyBYNkGhE41RP5bzmtKuBMryriYfEjZVoo0",
	authDomain: "sert-smash-freshly-baked.firebaseapp.com",
	databaseURL: "https://sert-smash-freshly-baked.firebaseio.com/",
	storageBucket: "gs://sert-smash-freshly-baked.appspot.com",
};

var app = firebase.initializeApp(config);
var database = firebase.database();

var user = null;

$("#pageLogin").click(function(e) {
	e.preventDefault();

	email = $("#inputEmail").val();
	password = $("#inputPassword").val();

	pageLogin(email, password);

	if (user == null) {
		user = firebase.auth().currentUser;
	}

	if (user.displayName == null) {
		$("#setup").modal("show");
	} else {
		$("#login").remove();
		animateStart();
	}
});

$("#pageRegister").click(function(e) {
	e.preventDefault();

	email = $("#inputEmail").val();
	password = $("#inputPassword").val();

	pageRegister(email, password);
	pageLogin(email, password);
});

$("#submitName").click(function(e) {
	e.preventDefault();

	teamName = $("#inputTeam").val();

	user.updateProfile({
		displayName: teamName
	});

	$("#setup").modal("hide");
	$("#setup").remove();

	$("#login").remove();
	animateStart();
});

$("#createTeam").click(function(e) {
	e.preventDefault();
	
	$("#setupTeam").modal("show");
});

$("#submitNewTeam").click(function(e) {
	e.preventDefault();

	teamName = $("#inputNewTeam").val();

	database.ref("users/" + user.uid + "/teams/" + teamName).set({
		teamID: teamName
	});

	$("#setupTeam").modal("hide");
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

		$("#headstuff").promise().done(function() {
			appendData();
		});
	});
}

function appendData() {
	//Append team info.
	$("#welcomeBack").text("Welcome Back Team #" + user.displayName + "!");
	$("#emailRef").text("Logged in as " + user.email);

	//Append teams.
	firebase.database().ref("/users/" + user.uid + "/teams/").once("value").then(function(snapshot) {
		name = snapshot.val();
		name = name["name"];

		$("#teamsList").append($("<li list-group-item>").text("Team #" + name));
	});
}

function pageLogin(email, password) {
	//Login
	firebase.auth().signInWithEmailAndPassword(email, password);
}

function pageRegister(email, password) {
	//Register
	firebase.auth().createUserWithEmailAndPassword(email, password);
}
