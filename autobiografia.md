---
layout: default
title: "Autobiografía"
permalink: /autobiografia/
paginate: true
show_excerpts: true
entries_layout: list
---

<style>
.autobiografia-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.autobiografia-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-family: Georgia, serif;
}

.autobiografia-columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
}

.autobiografia-col {
  width: 48%;
  box-sizing: border-box;
  font-family: Georgia, serif;
  line-height: 1.6;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.autobiografia-col h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .autobiografia-columns {
    flex-direction: column;
  }

  .autobiografia-col {
    width: 100%;
    text-align: inherit;
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }
}
</style>

<div class="autobiografia-wrapper">
  <h1 class="autobiografia-title">Autobiografía</h1>
  <div class="autobiografia-columns">

    <div class="autobiografia-col left">
      <h2>Un poco sobre mí</h2>
      <p>Recuerdo con mucho cariño a un amigo que apareció en mi vida tras una tragedia familiar. A pesar de ser mucho mayor que yo, dedicó su tiempo a compartir su pasión por los astros...</p>
      <!-- Aquí continúa el texto completo de esta columna -->
    </div>

    <div class="autobiografia-col right">
      <h2>Mi camino espiritual</h2>
      <p>Crecí en un hogar católico y, el día que hice mi primera comunión, una pregunta comenzó a rondar mi mente...</p>
      <!-- Aquí continúa el texto completo de esta columna -->
    </div>

  </div>
</div>
