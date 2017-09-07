<?php

namespace FlexMedia;

class SendMail
{
    const SEND_TO = "email@email.email";
    const SUBJECT = "Form name";

    public function __construct(Array $fields)
    {
        if(empty($fields) || !is_array($fields)) {
            return;
        }

        $str_html = $this->makeContent($fields);

        $this->send($str_html);

    }

    protected function makeContent(Array $fields)
    {
        $result = "<table>";

        foreach ($fields as $name => $value) {
            $result .= <<<ROW
                <tr>
                    <td>{$name}</td>
                    <td>{$value}</td>
                </tr>
ROW;
        }

        $result .= "</table>";

        return $result;
    }

    public function send($str_html)
    {
        echo $str_html;
        return mail(self::SEND_TO, self::SUBJECT, $str_html);
    }
}
