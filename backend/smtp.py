from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import os
from dotenv import load_dotenv

load_dotenv()

msg = MIMEMultipart()
msgText = "Estou enviando um email com Python"

password = os.getenv('SMTP_PASSWORD')
msg['From'] = os.getenv('SMTP_SENDER')
msg['To'] = os.getenv('SMTP_RECIPIENT')
msg['Subject'] = "SUBJECT"

msg.attach(MIMEText(msgText, 'plain'))

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()

try:
    server.login(msg['From'], password)
    server.sendmail(msg['From'], msg['To'], msg.as_string())
    print('Mensagem enviada com sucesso')
except smtplib.SMTPAuthenticationError as e:
    print(f'Erro de autenticação: {e}')
finally:
    # Encerramento do servidor
    server.quit()
