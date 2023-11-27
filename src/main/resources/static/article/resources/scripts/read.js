const commentTable = document.getElementById('commentTable');

const comment = {};

comment.load = function() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        commentTable.classList.remove('loading');
        if (xhr.status < 200 || xhr.status >= 300) {

            return;
        }

    }
    xhr.open('GET', `./comment?articleIndex=${commentForm['articleIndex'].value}`);
    xhr.send();
    commentTable.classList.add('loading');
}

const commentForm = document.getElementById('commentForm');

if (commentForm) {
    commentForm.onsubmit = function (e) {
        e.preventDefault();
        if (commentForm['content'].value === '') {
            dialog.show({
                title: '경고',
                content: '댓글을 입력해 주세요.',
                buttons: [dialog.createButton('확인', function () {
                    dialog.hide();
                    commentForm['content'].focus();
                })]
            });
            return false;
        }
        if (!commentForm['content'].testRegex()) {
            dialog.show({
                title: '경고',
                content: '올바른 댓글을 입력해 주세요.',
                buttons: [dialog.createButton('확인', function () {
                    dialog.hide();
                    commentForm['content'].focus();
                    commentForm['content'].select();
                })]
            });
            return false;
        }
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('articleIndex', commentForm['articleIndex'].value);
        formData.append('content', commentForm['content'].value);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }
            loading.hide();
            // TODO : Handle errors
            if (xhr.status < 200 || xhr.status >= 300) {
                dialog.show({
                    title: '오류',
                    content: '요청을 전송하는 도중 예상치 못한 오류가 발생하였습니다.<br><br>잠시 후 다시 시도해 주세요.',
                    buttons: [dialog.createButton('확인', dialog.hide)]
                });
                return;
            }
            const responseObject = JSON.parse(xhr.responseText);
            switch (responseObject['result']) {
                case 'failure':
                    dialog.show({
                        title: '오류',
                        content: '알 수 없는 이유로 댓글을 작성하지 못하였습니다.<br><br>잠시 후 다시 시도해 주세요.',
                        buttons: [dialog.createButton('확인', dialog.hide)]
                    });
                    break;
                case 'success':
                    commentForm['content'].value = '';
                    commentForm['content'].focus();
                    comment.load();
                    break;
                default:
                    dialog.show({
                        title: '오류',
                        content: '서버가 예상치 못한 응답을 반환하였습니다.<br><br>잠시 후 다시 시도해 주세요.',
                        buttons: [dialog.createButton('확인', dialog.hide)]
                    });
            }
        }
        xhr.open('POST', './comment');
        xhr.send(formData);
        loading.show();
    }
}