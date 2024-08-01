from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import os
from dotenv import load_dotenv

load_dotenv()

# Load environment variables
senha = os.getenv('SMTP_PASSWORD')
email_de = os.getenv('SMTP_SENDER')
email_para = os.getenv('SMTP_RECEIVER')
assunto = 'Assunto'
texto = 'Hello, World!'

msg = MIMEMultipart()
msg['From'] = email_de
msg['To'] = email_para
msg['Subject'] = assunto
msg.attach(MIMEText(texto, 'plain'))

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()

try:
    server.login(email_de, senha)
    server.sendmail(email_de, email_para, msg.as_string())
    print('Mensagem enviada com sucesso')
except smtplib.SMTPAuthenticationError as e:
    print(f'Erro de autenticação: {e}')
except Exception as e:
    print(f'Ocorreu um erro: {e}')
finally:
    server.quit()
