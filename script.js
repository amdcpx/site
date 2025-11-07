// ... (código anterior) ...

// Implementação do EmailJS para envio do Formulário
const PUBLIC_KEY = "bNhEayiZXAy1MU0km"; // Chave Pública REAL
const SERVICE_ID = "service_03v4uq3"; 
const TEMPLATE_ID = "template_unccsst"; 

// Inicializa o EmailJS
(function() {
    // Verifica se o SDK do EmailJS foi carregado (para evitar erros)
    if (typeof emailjs !== 'undefined') {
        emailjs.init(PUBLIC_KEY);
    } else {
        console.error("EmailJS SDK not loaded. Verifique se o <script> do SDK está no index.html.");
    }
})();

function sendMail(event) {
    // 1. Previne o comportamento padrão (recarregar a página)
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // 2. Coleta os dados do formulário
    const templateParams = {
        from_name: form.nome.value,
        from_email: form.email.value,
        telefone: form.telefone.value,
        servico: form.servico.value,
        message: form.mensagem.value,
    };

    // 3. Validação básica
    if (!templateParams.from_name || !templateParams.from_email || !templateParams.telefone || templateParams.servico === "" || !templateParams.message) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    if (!isValidEmail(templateParams.from_email)) {
        showMessage('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    
    // 4. Feedback visual e desabilita o botão
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // 5. Envia o e-mail
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function(response) {
            // Sucesso
            console.log('SUCCESS!', response.status, response.text);
            showMessage(`Obrigado, ${templateParams.from_name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`, 'success');
            form.reset(); // Limpa o formulário
        }, function(error) {
            // Falha
            console.log('FAILED...', error);
            showMessage('Falha ao enviar a mensagem. Por favor, tente novamente.', 'error');
        })
        .finally(function() {
            // Restaura o botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

// ... (Restante das funções auxiliares) ...
