<?

$dbh = pg_connect("host=localhost dbname=BGCAREPORTING user=postgres");

if (!$dbh) {
    die("Error in connection: " . pg_last_error());
}

$SCHOOL = $_GET["school"];

$sql = "SELECT AVG(TOTAL) FROM bgca_reporting_pre_survey WHERE SCHOOL = '$SCHOOL'";	

$result = pg_query($dbh, $sql);

if (!$result) {
    die("Error in SQL query: " . pg_last_error());
}

$arr = array ('school'=>$result);
echo json_encode($arr);

?>