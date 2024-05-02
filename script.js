const searchUser = document.querySelector(".input-button")

searchUser.addEventListener("submit", async (event) => {
    event.preventDefault()

    const username = event.target.querySelector(".username").value
    try {
        const userInfo = await getInfo(username)
        const userRepositorio = await getRepositorio(username)
        updateHTML(userInfo, userRepositorio)
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
})

async function getInfo(username) {
    const token = ''; //token github
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Ocorreu um erro ao obter informações do usuário:', error);
        throw error;
    }
}

async function getRepositorio(username) {
    const token = ''; //token github 
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Ocorreu um erro ao obter repositórios do usuário:', error);
        throw error;
    }
}

function updateHTML(userInfo, userRepositorio) {
    // Atualizar imagem
    const imgElement = document.querySelector(".img");
    imgElement.src = userInfo.avatar_url;

    // Atualizar nome
    const nameElement = document.querySelector(".name");
    nameElement.textContent = userInfo.name || "N/A";

    // Atualizar biografia
    const bioElement = document.querySelector(".bio");
    bioElement.textContent = userInfo.bio || "N/A";

     // Atualizar lista de repositórios
     const reposElement = document.querySelector(".repolist");

     // Limpar lista antes de atualizar
     reposElement.innerHTML = "";
 
     // Criar lista de repositórios
     const reposList = document.createElement("ul");
     userRepositorio.forEach(repo => {
         const repoItem = document.createElement("li");
         const repoLink = document.createElement("a");
         repoLink.href = repo.html_url;
         repoLink.textContent = repo.name;
         repoItem.appendChild(repoLink);
         reposList.appendChild(repoItem);
     });
 
     // Adicionar lista de repositórios ao elemento
     reposElement.appendChild(reposList);

}


