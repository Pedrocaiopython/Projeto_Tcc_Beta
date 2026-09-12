document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const authMessage = document.getElementById('authMessage');
  const tabs = document.querySelectorAll('.auth-tab');

  function setMessage(message, type = 'info') {
    authMessage.textContent = message || '';
    authMessage.className = 'status-box';
    if (type === 'success') authMessage.classList.add('success');
    if (type === 'error') authMessage.classList.add('error');
  }

  function switchForm(targetId) {
    const targetForm = document.getElementById(targetId);
    tabs.forEach((tab) => {
      const active = tab.dataset.target === targetId;
      tab.classList.toggle('active', active);
    });
    loginForm.classList.toggle('active', targetId === 'loginForm');
    registerForm.classList.toggle('active', targetId === 'registerForm');
    setMessage('');
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => switchForm(tab.dataset.target));
  });

  async function redirectIfAuthenticated() {
    const session = await getSessionInfo();
    if (session) {
      window.location.href = '/menu_principal.html';
    }
  }

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = {
      email: form.email.value.trim(),
      password: form.password.value
    };

    try {
      setMessage('Entrando...', 'info');
      const result = await requestJson('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      setMessage(result.message || 'Login realizado!', 'success');
      setTimeout(() => {
        window.location.href = '/menu_principal.html';
      }, 450);
    } catch (error) {
      setMessage(error.message || 'Não foi possível entrar.', 'error');
    }
  });

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value
    };

    try {
      setMessage('Criando sua conta...', 'info');
      const result = await requestJson('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      setMessage(result.message || 'Conta criada com sucesso!', 'success');
      setTimeout(() => {
        window.location.href = '/menu_principal.html';
      }, 500);
    } catch (error) {
      setMessage(error.message || 'Não foi possível criar sua conta.', 'error');
    }
  });

  redirectIfAuthenticated();
});
