from flask import Flask, render_template, request, jsonify, redirect, url_for
import random
import webbrowser
import urllib.parse

app = Flask(__name__)

# Admin number for WhatsApp notifications
ADMIN_PHONE = "918138030292"

# In-memory storage for OTPs (simulating a database)
pending_otps = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def send_otp():
    data = request.json
    email = data.get('email')
    user_id = data.get('userId')
    phone = data.get('phone')

    # Basic Indian number validation
    if not phone or len(phone) != 10 or not phone.startswith(('6', '7', '8', '9')):
        return jsonify({"success": False, "message": "Invalid Indian phone number."}), 400

    otp = str(random.randint(100000, 999999))
    pending_otps[user_id] = otp

    # Construct WhatsApp Message
    wa_message = f"Nova Security: New login attempt detected. Details: - Email: {email} - User ID: {user_id} - Phone: +91 {phone} Verification Code: {otp}"
    wa_link = f"https://wa.me/{ADMIN_PHONE}?text={urllib.parse.quote(wa_message)}"

    # In a real server, we wouldn't use webbrowser.open (it opens on the server).
    # We return the link so the frontend can open it.
    return jsonify({
        "success": True, 
        "wa_link": wa_link,
        "message": "OTP sent to admin device."
    })

@app.route('/verify', methods=['POST'])
def verify_otp():
    data = request.json
    user_id = data.get('userId')
    entered_otp = data.get('otp')

    if user_id in pending_otps and pending_otps[user_id] == entered_otp:
        del pending_otps[user_id]
        return jsonify({"success": True, "redirect": "home.html"})
    
    return jsonify({"success": False, "message": "Invalid OTP."}), 401

if __name__ == '__main__':
    print("Nova Backend running on http://127.0.0.1:5000")
    app.run(debug=True)
