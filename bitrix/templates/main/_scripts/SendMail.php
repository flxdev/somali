<?php

namespace FlexMedia;

class SendMail
{
    const SEND_TO = "email@email.email";
    const SUBJECT = "Form name";

    protected $send_to;
    protected $subject;

    public function __construct(Array $fields, Array $params = [])
    {
        if (empty($fields) || !is_array($fields)) {
            return;
        }

        if (!empty($params)) {
            if (isset($params['send_to'])) {
                $this->send_to = $params['send_to'];
            }
            if (isset($params['subject'])) {
                $this->subject = $params['subject'];
            }
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
        $send_to = !empty($this->send_to) ? $this->send_to : self::SEND_TO;
        $subject = !empty($this->subject) ? $this->subject : self::SUBJECT;

        return mail($send_to, $subject, $str_html);
    }
}
