library Constants;

import 'dart:io' show Platform;
import 'package:flutter/material.dart';

// APIS
String LOCAL_URL =
    Platform.isAndroid ? "http://10.0.2.2:8000/" : "http://localhost:8000/";
const String PUBLIC_URL = "https://bizinissify.herokuapp.com/";
String BASE_URL = PUBLIC_URL;

var HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

const String CREATE_ACCOUNT = "createAccount";
const String GET_PROFILE = "getProfile";
const String UPDATE_PROFILE = "updateProfile";
const String ADD_BILLING_INFO = "addBillingInfo";
const String GET_BILLING_INFO = "getBillingInfo";
const String UPDATE_BILLING_INFO = "updateBillingInfo";
const String ADD_POST = "addPost";
const String GET_ALL_POSTS = "getAllPosts";
const String GET_FILTERED_POSTS = "getFilteredPosts";
const String GET_POST_DETAILS = "getPostDetails";
const String GET_OWN_POSTS = "getOwnPosts";
const String GET_POST_TO_EDIT = "getPostToEdit";
const String EDIT_POST = "editPost";
const String ADD_FRANCHISE = "addFranchise";
const String GET_ALL_FRANCHISES = "getAllFranchises";
const String GET_FILTERED_FRANCHISES = "getFilteredFranchises";
const String GET_FRANCHISE_DETAILS = "getFranchiseDetails";
const String GET_OWN_FRANCHISES = "getOwnFranchises";
const String GET_FRANCHISE_TO_EDIT = "getFranchiseToEdit";
const String EDIT_FRANCHISE = "editFranchise";
const String MEMBERSHIP_PAYMENT = "stripe/charge";

// Colors
const Color APP_COLOR = Colors.orange;
const Color BUTTON_COLOR = Colors.orangeAccent;
const Color BACKGROUND_ORANGE = Color.fromARGB(255, 255, 230, 204);
const Color TRANSPARENT = Colors.transparent;
const Color BLACK = Colors.black;
const Color BLACK_DISABLE = Color.fromARGB(60, 0, 0, 0);
const Color LIGHT_COLOR = Color.fromRGBO(255, 255, 255, 100);
const Color LIGHTER_BLACK = Color.fromARGB(50, 0, 0, 0);
const Color WHITE = Colors.white;
const Color GREY = Colors.grey;
const Color RED = Colors.red;
const Color SUCCESS = Color.fromARGB(80, 0, 255, 0);
const Color ERROR = Color.fromARGB(80, 255, 0, 0);
const Color MSG_OWN = Color.fromARGB(20, 0, 0, 0);
const Color MSG_OTHER = Color.fromARGB(100, 255, 230, 204);

List<Map> options = [
  {"value": 1, "label": 'Business'},
  {"value": 2, "label": 'Asset'},
  {"value": 3, "label": 'Website'},
  {"value": 4, "label": 'Mobile App'},
];

List<Map> franchiseOptions = [
  {"value": 1, "label": 'Restaurant'},
  {"value": 2, "label": 'Automobile'},
  {"value": 3, "label": 'Institute'},
  {"value": 4, "label": 'Grocery'},
];

List<String> countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas ",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo (the Democratic Republic of the)",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands [Malvinas]",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom of Great Britain and Northern Ireland",
  "United States Minor Outlying Islands",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands"
];

List<String> timesArray = [
  'Today',
  'Current Month',
  'Current Year',
];

List<Map> memberships = [
  {
    "id": 1,
    "title": 'MemberShip 1',
    "duration": 'Monthly',
    "postsLimit": 5,
    "contactsLimit": 10,
    "amount": 20,
    "details": 'dggrth grthfg nhrng hdbhg\nergregrg gergert er tret et\ner tgret et wtr et e t re t'
  },
  {
    "id": 2,
    "title": 'MemberShip 2',
    "duration": 'Quarterly',
    "postsLimit": 25,
    "contactsLimit": null,
    "amount": 50,
    "details": 'dggrth grthfg nhrng hdbhg\nergregrg gergert er tret et\ner tgret et wtr et e t re t'
  },
  {
    "id": 3,
    "title": 'MemberShip 3',
    "duration": 'Annual',
    "postsLimit": null,
    "contactsLimit": null,
    "amount": 200,
    "details": 'dggrth grthfg nhrng hdbhg\nergregrg gergert er tret et\ner tgret et wtr et e t re t'
  }
];