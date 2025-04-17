document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    // 从本地存储加载待办事项
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // 渲染待办事项列表
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <div>
                    <button onclick="toggleTodo(${index})">${todo.completed ? '撤销' : '完成'}</button>
                    <button class="delete-btn" onclick="deleteTodo(${index})">删除</button>
                </div>
            `;
            todoList.appendChild(li);
        });
        // 保存到本地存储
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // 添加新的待办事项
    window.addTodo = () => {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            todoInput.value = '';
            renderTodos();
        }
    }

    // 切换待办事项状态
    window.toggleTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    // 删除待办事项
    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        renderTodos();
    }

    // 添加按钮点击事件
    addButton.addEventListener('click', addTodo);

    // 回车键添加待办事项
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // 初始渲染
    renderTodos();
}); 