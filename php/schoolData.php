<?

$dbh = pg_connect("host=localhost port=5433 dbname=postgres user=postgres password=aoeu.123") or die('Could not connect: ' . pg_last_error());

if (!$dbh) {
    die("Error in connection: " . pg_last_error());
}

$SCHOOL = $_GET["school"];
$GRADE = $_GET["grade"];

$sql = '';

if(!GRADE) {
	$sql = "SELECT row_to_json(bgca_reporting_pre_survey) FROM bgca_reporting_pre_survey WHERE SCHOOL = '$SCHOOL'";	
}
else {
	$sql = "SELECT row_to_json(bgca_reporting_pre_survey) FROM bgca_reporting_pre_survey WHERE SCHOOL = '$SCHOOL' AND GRADE = '$GRADE'";
}

$result = pg_query($dbh, $sql);

if (!$result) {
    die("Error in SQL query: " . pg_last_error());
}

$arr = array ('school'=>$result);

header('Content-Type: application/json');
echo json_encode($arr);

?>