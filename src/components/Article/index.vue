<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import { createPopper } from '@popperjs/core';
import { ElTable, ElTableColumn } from 'element-plus'
import { generateClientRect } from '@/utils';
import { dom } from 'highlighter/build/lib';

const dropdownMenuRef = ref(null);
const popperRef = shallowRef({ instance: null });

const virtualElement = {
  getBoundingClientRect: () => generateClientRect(-1000)
};

onMounted(() => {
  popperRef.value.instance = createPopper(
    virtualElement,
    dropdownMenuRef.value,
    {
      placement: 'bottom-start',
      modifiers: [{ name: 'eventListeners', options: { scroll: false } }]
    }
  );
});

function handleMouseUp (event) {
  const [ range ] = dom.getAllRange(window.getSelection());

  if (!range.collapsed && range.toString() !== '') {
    const { x, y } = event;
    // flew in
    virtualElement.getBoundingClientRect = () => generateClientRect(x, y);
  }

  popperRef.value.instance.forceUpdate();
}

function handleMouseDown () {

}

</script>

<template>
  <article 
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp" 
    ref="rootRef"
  >
    <header>
      <h1>Math: How to Easily Find a Nash Equilibrium in Game Theory</h1>
    </header>
    <p><em>I hold both a bachelor's and a master's degree in applied mathematics.</em></p>
    <h2>What Is Game Theory?</h2>
    <p>
      Game theory is a field in mathematics that deals with problems in which multiple actors, called players, take
      a
      decision. The name suggests that it has to do with board games, or computer games. Originally game theory was
      used to analyse board game strategies; however, nowadays it is used for a lot of real-world problems.
    </p>
    <p>
      In a mathematical game, the payoff of a player is not only determined by his own choice of strategy, but also
      by
      the strategies chosen by the other players. Therefore it is important to anticipate the other players'
      actions.
      Game theory tries to analyse the optimal strategy for multiple types of games.
    </p>
    <h2>Non-Cooperative Game Theory</h2>
    <p>
      A subfield of game theory is the non-cooperative game theory. This field deals with problems where the players
      cannot cooperate and have to decide on their strategy without being able to discuss with the other players.
    </p>
    <p>
      There are two types of games in non-cooperative game theory:
    </p>
    <ul>
      <li>In <strong>simultaneous games</strong>, both players make their decision at the same moment.</li>
      <li>In <strong>sequential games</strong>, the players have to act in order. Whether they know what strategies
        the previous players have chosen can differ per game. If they do, it is called a game with complete
        information, else it is called a game with incomplete information.</li>
    </ul>
    <h2>John Forbes Nash Jr.</h2>
    <p>
      John Forbes Nash Jr. was an American mathematician that lived from 1928 until 2015. He was a researcher at
      Princeton University. His work was mainly in the field of game theory, in which he made numerous important
      contributions. In 1994, he won the Nobel Prize for Economics for his applications of game theory in economics.
      The Nash equilibrium is a part of a comprehensive equilibrium theory that Nash proposed.
    </p>
    <h2>An Example: The Prisoner's Dilemma</h2>
    <p>
      The Prisoner's Dilemma is one of the most well-known examples of non-cooperative game theory. Two friends are
      arrested for committing a crime. The police asks them independently whether they have done it or not. If both
      lie and say they didn't, and they both get three years in prison because the police has only a little evidence
      against them.
    </p>
    <p>
      If both tell the truth that they are guilty, they will get seven years each. If one tells the truth and the
      other lies, then the one who tells the truth gets one year in prison and the other gets ten. This game is
      displayed in the matrix below. In the matrix, the strategies for player A are displayed vertically, and the
      strategies of player B horizontally. The payoff x,y means that player A gets x and player B gets y.
    </p>
    <div>
      <el-table :data="null" border style="width: 100%">
        <el-table-column prop="position" label="" width="180" />
        <el-table-column prop="lie" label="Lie" width="180" />
        <el-table-column prop="ellTruth" label="ell Truth" />
      </el-table>
    </div>

    <!--      <img />-->
    <h2>What Is a Nash Equilibrium and How Do You Find One?</h2>
    <p>The definition of a Nash equilibrium is an outcome of a game in which none of the players wants to switch
      strategies if the others don't. The Prisoner's Dilemma has one Nash equilibrium, namely 7,7 which corresponds
      to
      both players telling the truth. If player A would switch to lie while player B stays with telling the truth
      player A would get 10 years in prison, so he won't switch. The same holds for player B.</p>
    <p>
      It seems like 3,3 is a better solution than 7,7. However, 3,3 is not a Nash equilibrium. If the players end up
      in 3,3 then if a player switches from lie to tell truth he reduces his penalty to 1 year if the other stays
      with
      lie.
    </p>
    <h2>Games With Multiple Nash Equilibria</h2>
    <p>It is possible for a game to have multiple Nash equilibria. An example is shown in the table below. In this
      example payoffs are positive. So a higher number is better.</p>

    <div>
      <el-table
        :data="[{ position: 'Top', left: '5, 4', right: '2, 3' }, { position: 'Bottom', left: '1, 7', right: '4, 9' }]"
        border style="width: 100%">
        <el-table-column prop="position" label="" width="180" />
        <el-table-column prop="left" label="Left" width="180" />
        <el-table-column prop="right" label="Right" />
      </el-table>
    </div>

    <p>
      In this game, both (Top,Left) and (Bottom,Right) are Nash equilibria. If A and B choose (Top,Left) then A can
      switch to Bottom, but this would reduce his payoff from 5 to 1. Player B can switch from left to right, but
      this
      would reduce his payoff from 4 to 3.
    </p>
    <p>
      If the players are in (Bottom,Right) player A can switch, but then he reduces his payoff from 4 to 2 and
      player
      B can only reduce his payoff from 9 to 7.
    </p>
    <h2>Games Without a Nash Equilibrium</h2>
    <p>
      Besides having one or multiple Nash equilibria, it is also possible for a game to have no Nash equilibrium. An
      example of a game that has no Nash equilibrium is shown in the table below.
    </p>
  </article>
  <ul class="dropdown-menu show" ref="dropdownMenuRef">
    <li><button class="dropdown-item mark-button">mark</button></li>
    <li><button class="dropdown-item underline-button">underline</button></li>
  </ul>

</template>

<style scoped lang="scss">
@import 'bootstrap/scss/_functions';
@import 'bootstrap/scss/_variables';
@import 'bootstrap/scss/_mixins';
@import 'bootstrap/scss/dropdown.scss';

.dropdown-menu {
  --bs-dropdown-border-color: #dee2e6;
  border: var(--bs-dropdown-border-width) solid var(--bs-dropdown-border-color);
}

p,
li {
  line-height: 1.5;
}
</style>