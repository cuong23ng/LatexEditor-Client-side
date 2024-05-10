<script setup>
    import { ref } from 'vue';
    import { VAceEditor } from 'vue3-ace-editor';
    import 'ace-builds/src-noconflict/mode-latex'; // Load the language definition file used below
    import 'ace-builds/src-noconflict/theme-textmate'; // Load the theme definition file used below

    const content = ref('\\documentclass{article}\n\\usepackage[utf8]{vietnam}\n\\usepackage{hyperref}\n\\usepackage{graphicx}\n\\usepackage{subfigure}\n\\usepackage[short]{datetime}\n\\title{\huge{Đề thi Kiến Thức Máy tính lớp Công nghệ thông tin Việt Pháp \\\ngày 22/2/2022 kỳ 20211-IT2120}}\n\\author{\LARGE{Nguyễn Hùng Cường \\\ 20215264}}\n\\date{\LARGE{\\today}}\n\n\n\\begin{document}\n\\maketitle\n\\pagenumbering{roman}\n\n\n\\section{Cách tính điểm của bài thi}\n\\begin{itemize}\n\\item Dịch được file (0,5 điểm)\n\\item 03 dòng tiêu đề mỗi dòng 0,25 điểm\n\\item Định dạng đúng (0,5 điểm)\n\\item Sectioning (0,75 điểm)\n\\item Math (2 điểm): biểu diễn được hàm số (1 điểm). Biểu diễn được công thức tính (1 điểm)\n\\item Table ( 1,5 điểm): bảng đầu 0,5 điểm, bảng sau 1 điểm\n\\item Figure (1,5 điểm): figure đầu 0,5 điểm, figure sau 1 điểm\n\\item Tạo itemize và enumerate (0,5 điểm)\n\\item Phụ lục (0,5 điểm)\n\\item Cross Ref (0,5 điểm)\n\\item Tạo mục lục và các danh sách (1 điểm): mục lục (0,5 điểm), danh sách hình (0,25 điểm), danh sách bảng (0,25 điểm)\n\\end{itemize}\n\\end{document}\n\n\n\n\n');
</script>

<template>
    <v-ace-editor
        v-model:value="content"
        lang="latex"
        theme="textmate"
        wrap="true"
        class="ace-editor"
              
    />
</template>

<style scoped>
  .ace-editor {
      height: 100%;
      font-size: 15px; 
  }
</style>