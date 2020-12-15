<?php
use PHPMailer\PHPMailer\PHPMailer;

require_once 'PHPMailer/src/Exception.php';
require_once 'PHPMailer/src/PHPMailer.php';
require_once 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

$alert = '';
$files = [];

function restructureArray(array $arr) {
  $result = array();
  foreach ($arr as $key => $value) {
    for ($i = 0; $i < count($value); $i++) {
      $result[$i][$key] = $value[$i];
    }
  }
  return $result;
}

if(isset($_POST['submit'])){
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $phone = $_POST['phone'];

  if(!empty($_FILES['uploaded_file'])) {
    $files = restructureArray($_FILES['uploaded_file']);
  }

  try{
    $mail->isSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'savva123456789018@gmail.com';
    $mail->Password = 'savva2004-2020';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = '587';

    $mail->setFrom('savva123456789018@gmail.com', "Frontier-rus.ru ($name)");
    $mail->addAddress('savva.povetkin@mail.ru');

    $mail->isHTML(true);
    $mail->Subject = 'frontier-rus.ru (обратная связь)';
    $mail->Body = "<h3>Имя: $name <br><br>Email: $email <br><br>Номер телефона: $phone <br><br>Сообщение: $message</h3>";

    if (!empty($files)) {
      foreach ($files as $key => $file) {
        if ($file['size'] > 2500000) {
          return $alert = '<div class="alert-error"><span>Размер файла слишком большой!</span></div>';
        } else {
        $mail->addAttachment($file['tmp_name'], $file['name']);
        }
      }
    }

    $mail->send();
    $alert = '<div class="alert-success">
                 <span>Message Sent! Thank you for contacting us.</span>
                </div>';
  } catch (Exception $e){
    $alert = '<div class="alert-error">
                <span>'.$e->getMessage().'</span>
              </div>';
  }
}
?>
                           