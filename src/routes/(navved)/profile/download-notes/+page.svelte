<script>
    import { onMount } from 'svelte';
    export let data;
    import JSZip from 'jszip';

    onMount(() => {
        const noteArray = data.noteArray;
        const zip = new JSZip();


        // Loop through each note
        noteArray.forEach((note, index) => {
            const markdownContent = `# ${note.name}\n${note.content}`;
            const blob = new Blob([markdownContent], { type: 'text/markdown' });
            //adding blob file to zip as markdown file
            zip.file(`note_${index + 1}.md`, blob);

        });
        // Generate the zip file
        zip.generateAsync({ type: 'blob' }).then((zipBlob) => {
            const zipUrl = window.URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = zipUrl;
            a.download = 'notes_export.zip';
            a.click();
            window.URL.revokeObjectURL(zipUrl);
        });
    });
</script>
