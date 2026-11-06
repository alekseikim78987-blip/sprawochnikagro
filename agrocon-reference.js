<!-- АГРОКОН · Справочник + похожие болезни -->
<script>
(function () {

  if (
    window
      .AGRO_REFERENCE_LOADER_WITH_SIMILAR
  ) return;

  window
    .AGRO_REFERENCE_LOADER_WITH_SIMILAR =
    true;

  function loadScript(src, callback) {

    var script =
      document.createElement('script');

    script.src = src;
    script.async = true;

    script.onload =
      function () {
        if (callback) callback();
      };

    script.onerror =
      function () {
        console.error(
          '[АГРОКОН] Не удалось загрузить:',
          src
        );
      };

    document.head.appendChild(
      script
    );
  }

  loadScript(
    'https://cdn.jsdelivr.net/gh/alekseikim78987-blip/sprawochnikagro@main/agrocon-reference.js?v=30.1',
    function () {

      loadScript(
        'https://cdn.jsdelivr.net/gh/alekseikim78987-blip/sprawochnikagro@main/agrocon-reference-similar.js?v=1.0'
      );

    }
  );

})();
</script>
