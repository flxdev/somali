<?php

require "SendMail.php";

new \FlexMedia\SendMail($_REQUEST, array("send_to" => "dima@flex.by", "subject" => "Заполнена форма на сайте"));