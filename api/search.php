<?php
header("Access-Control-Allow-Origin: https://search.net.eu.org");

if (isset($_GET["d"]))
{
    $fsock = fsockopen("whois.eu.org", 43, $errno, $errstr, 8);

    if ( !$fsock )
    {
        echo "😷 Error";

        exit;
    }

    $whois = "";

    fputs ( $fsock, "{$_GET["d"]}\r\n" );

    while (!feof($fsock))
    {
        $result .= fgets($fsock, 512);
    }

    fclose ($fsock);

    if ( strpos($result, "Key not found") !== FALSE )
    {
        echo "😄 Available\n";

        exit;
    }

    if ( strpos($result, "domain:") !== FALSE )
    {
        echo "😭 Registered\n";

        exit;
    }

    echo "😷 Error";

    exit;
}