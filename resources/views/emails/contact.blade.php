<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
</head>

<body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111;">
    <h2>New contact form submission</h2>

    <p><strong>Name:</strong> {{ $data['name'] ?? '-' }}</p>
    <p><strong>Email:</strong> {{ $data['email'] ?? '-' }}</p>
    <p><strong>Subject:</strong> {{ $data['subject'] ?? '-' }}</p>

    <h3>Message</h3>
    <div style="white-space:pre-wrap;">{{ $data['message'] ?? '-' }}</div>

    <hr />
    <p style="font-size:12px;color:#666;">This message was sent from the PortoLanding contact form.</p>
</body>

</html>
