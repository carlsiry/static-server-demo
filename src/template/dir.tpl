
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title> {{title}} </title>
  <style>
    body {
      margin: 20px;
    }
  </style>
</head>
<body>

  {{#each files}}
    <p>
      <a href="{{../dir}}/{{this}}">{{this}}</a>
    </p>
  {{/each}}

</body>
</html>