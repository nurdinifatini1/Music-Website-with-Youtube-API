<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);
    
    $data = "Name: $name\nEmail: $email\nPhone: $phone\nMessage: $message\n\n";
    
    $file = 'submissions.txt';
    
    file_put_contents($file, $data, FILE_APPEND);
    
    echo "<script type='text/javascript'>
        alert('Thank you for your message!');
        window.location.href = 'contact.html';
    </script>";
}
?>
