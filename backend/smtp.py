import sys
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# Credenciais do Gmail a partir das variáveis de ambiente
sender = os.getenv('SMTP_SENDER')
password = os.getenv('SMTP_PASSWORD')

# Verificar se as credenciais estão carregadas
if not sender or not password:
    print("Erro: As credenciais de e-mail não foram definidas nas variáveis de ambiente.")
    sys.exit(1)

# Obter argumentos da linha de comando
if len(sys.argv) != 4:
    print("Uso: python smtp.py <receiver> <subject> <text>")
    sys.exit(1)

receiver = sys.argv[1]
subject = sys.argv[2]
text = sys.argv[3]

# Montar a mensagem
msg = MIMEMultipart()
msg['From'] = sender
msg['To'] = receiver
msg['Subject'] = subject
msg.attach(MIMEText(text, 'plain'))

# Conectar ao servidor SMTP do Gmail
server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()

try:
    # Realizar login e enviar o email
    server.login(sender, password)
    server.sendmail(sender, receiver, msg.as_string())
    print('Mensagem enviada com sucesso')
except smtplib.SMTPAuthenticationError as e:
    print(f'Erro de autenticação: {e}')
finally:
    # Encerrar a conexão com o servidor SMTP
    server.quit()
