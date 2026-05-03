<?php

function prepare_token_text($token, $first_name, $last_name)
{
    return "$first_name $last_name We received a request to reset your password for your account. To set new password use the code below:
     $token 
    This code is available for 30 minutes only!
    If you didn’t request this, you can safely ignore this message. No action needed.";
}

function prepare_forgot_text($token, $first_name, $last_name)
{
    return "$first_name $last_name Your journey starts here. 
    To unlock your account, please confirm
    your email using the verification code below:
     $token 
    This code is available for 30 minutes only!
    If you didn’t request this, you can safely ignore this message. No action needed.";
}

function prepare_token_template($token, $first_name, $last_name)
{

    return "<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>Verify Email</title>
  </head>

  <body>
    <div
      style=\"
        padding: 0.8rem;
        font-family: &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif;
        background: hsl(240, 100%, 100%);
      \"
      class=\"wrapper\"
    >
      <div
        style=\"
          width: min(100%, 540px);
          margin-inline: auto;
          border-radius: 0.8rem;
          border: 1px solid hsl(180, 91%, 31%);
        \"
        class=\"container\"
      >
        <div
          style=\"
            background: hsl(180, 91%, 31%);
            padding: 1.5rem 0.5rem;
            border-radius: 0.8rem 0.8rem 0 0;
          \"
          class=\"header\"
        >
          <h1
            style=\"
              text-align: center;
              font-size: 1.5rem;
              font-family:
                &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif;
              color: hsl(240, 100%, 100%);
            \"
          >
            TalentFlow | Talents garden
          </h1>
        </div>

        <div style=\"padding: 0 0.8rem\" class=\"content\">
          <p>
            Hello
            <span style=\"font-weight: 700\" class=\"highlight\"
              >$first_name $last_name</span
            >
          </p>

          <p>
            Your journey starts here. To unlock your account, please confirm
            your email using the verification code below:
          </p>

          <div
            style=\"
              background: hsl(200, 5%, 24%);
              border-radius: 0.8rem;
              padding: 1rem;
              width: max-content;
              margin-inline: auto;
            \"
            class=\"code-box\"
          >
            <div
              style=\"
                width: max-content;
                color: hsl(240, 100%, 100%);
                font-size: 1.5rem;
                font-family: &quot;Courier New&quot;, Courier, monospace;
              \"
              class=\"code\"
            >
              $token
            </div>
          </div>

          <div style=\"\">
            <p
              style=\"
                color: hsl(350, 100%, 56%);
                font-weight: 800;
                padding: 0;
                margin-bottom: 0;
              \"
            >
              Caution
            </p>
            <p
              style=\"
                color: hsl(200, 5%, 24%);
                font-weight: 500;
                padding: 0;
                margin-top: 0;
              \"
            >
              This code is available for 30 minutes only! 
            </p>
          </div>

          <div class=\"divider\"></div>

          <p
            style=\"
              color: hsl(200, 5%, 24%);
              font-weight: 500;
              padding: 0;
              margin-top: 0;
            \"
          >
            If you didn’t request this, you can safely ignore this message. No
            action needed.
          </p>

          <p>
            <strong>TalentFlow</strong><br />
            Talents garden
          </p>
        </div>

        <div
          style=\"
            padding: 1.5rem 0.8rem;
            background: hsl(200, 5%, 24%);
            border-radius: 0 0 0.8rem 0.8rem;
            color: hsl(240, 100%, 100%);
            text-align: center;
            font-size: 0.9rem;
          \"
        >
          © 2026 TalentFlow • Talents Garden
        </div>
      </div>
    </div>
  </body>
</html>";
}

function prepare_forgot_tempate($token, $first_name, $last_name)
{
    return "
        <!doctype html>

<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>Forgot Password</title>
  </head>

  <body>
    <div
      style=\"
        padding: 0.8rem;
        font-family: &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif;
        background: hsl(240, 100%, 100%);
      \"
    >
      <div
        style=\"
          width: min(100%, 540px);
          margin-inline: auto;
          border-radius: 0.8rem;
          border: 1px solid hsl(180, 91%, 31%);
        \"
      >
        <div
          style=\"
            background: hsl(180, 91%, 31%);
            padding: 1.5rem 0.5rem;
            border-radius: 0.8rem 0.8rem 0 0;
          \"
        >
          <h1
            style=\"
              text-align: center;
              font-size: 1.5rem;
              font-family:
                &quot;Segoe UI&quot;, Tahoma, Geneva, Verdana, sans-serif;
              color: hsl(240, 100%, 100%);
            \"
          >
            TalentFlow | Talents garden
          </h1>
        </div>

        <div style=\"padding: 0 0.8rem\" class=\"content\">
          <p>
            Hello
            <span style=\"font-weight: 700\" class=\"highlight\"
              >$first_name $last_name</span
            >
          </p>

          <p>
            We received a request to reset your password for your account. To set new password use the code below:
          </p>

          <div
            style=\"
              background: hsl(200, 5%, 24%);
              border-radius: 0.8rem;
              padding: 1rem;
              width: max-content;
              margin-inline: auto;
            \"
            class=\"code-box\"
          >
            <div
              style=\"
                width: max-content;
                color: hsl(240, 100%, 100%);
                font-size: 1.5rem;
                font-family: &quot;Courier New&quot;, Courier, monospace;
              \"
              class=\"code\"
            >
              $token
            </div>
          </div>

          <div style=\"\">
            <p
              style=\"
                color: hsl(350, 100%, 56%);
                font-weight: 800;
                padding: 0;
                margin-bottom: 0;
              \"
            >
              Caution
            </p>
            <p
              style=\"
                color: hsl(200, 5%, 24%);
                font-weight: 500;
                padding: 0;
                margin-top: 0;
              \"
            >
              This code is available for 10 minutes only!
            </p>
          </div>

          <div></div>

          <p
            style=\"
              color: hsl(200, 5%, 24%);
              font-weight: 500;
              padding: 0;
              margin-top: 0;
            \"
          >
            If you didn’t request this, you can safely ignore this message. No
            action needed.
          </p>

          <p>
            <strong>TalentFlow</strong><br />
            Talents garden
          </p>
        </div>

        <div
          style=\"
            padding: 1.5rem 0.8rem;
            background: hsl(200, 5%, 24%);
            border-radius: 0 0 0.8rem 0.8rem;
            color: hsl(240, 100%, 100%);
            text-align: center;
            font-size: 0.9rem;
          \"
        >
          © 2026 TalentFlow • Talents Garden
        </div>
      </div>
    </div>
  </body>
</html>";
}

?>