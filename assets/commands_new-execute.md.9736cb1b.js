import{_ as e,c as t,o as a,e as n}from"./404.md.978012e8.js";const g='{"title":"New Execute","description":"","frontmatter":{"title":"New Execute","category":"General","tags":["easy","experimental"],"mention":["JaylyDev"]},"headers":[{"level":2,"title":"Introduction","slug":"introduction"},{"level":2,"title":"Execute, and Why it Changed","slug":"execute-and-why-it-changed"},{"level":2,"title":"New Syntax","slug":"new-syntax"},{"level":3,"title":"`/execute as`","slug":"execute-as"},{"level":3,"title":"`/execute at`","slug":"execute-at"},{"level":3,"title":"`/execute positioned`","slug":"execute-positioned"},{"level":3,"title":"`/execute (if|unless)`","slug":"execute-if-unless"},{"level":3,"title":"`/execute run`","slug":"execute-run"},{"level":2,"title":"Examples and Upgrading Old Commands","slug":"examples-and-upgrading-old-commands"}],"relativePath":"commands/new-execute.md"}',s={},o=n(`<h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-hidden="true">#</a></h2><p>With the release of 1.19.10, the Upcoming Creator Features experimental toggle gave the <code>/execute</code> command a syntax overhaul. While the syntax is now more verbose and longer to write, it allows much finer control over the contextual components of commands and adds support for conditions to commands, superseding the use of commands like <code>/testfor</code>, <code>/testforblock</code>, and <code>/testforblocks</code>.</p><p>Before we dive into the syntax and how to write it, we need to understand how the old <code>/execute</code> command worked, and what changed and why. This will make explaining the concepts found in the syntax easier.</p><h2 id="execute-and-why-it-changed" tabindex="-1">Execute, and Why it Changed <a class="header-anchor" href="#execute-and-why-it-changed" aria-hidden="true">#</a></h2><p>The <code>/execute</code> command executes a command on behalf of one or more entities. The old syntax used to be this:</p><div class="language-"><pre><code>/execute &lt;target&gt; &lt;position&gt; &lt;command&gt;
/execute &lt;target&gt; &lt;position&gt; detect &lt;position&gt; &lt;block&gt; &lt;data value&gt; &lt;command&gt;
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>You specified a target to execute as, then the command&#39;s context would change to run as that target, and at that target. Any positions were then relative to that target. While this is useful in most cases, it also forces the fact that a command&#39;s target and its position are always tied together (unless you were to manually insert world coordinates in place of <code>&lt;position&gt;</code>). It&#39;s also not very malleable in regards to making conditional statements, as you have to execute as an entity every time.</p><p>Back in the Summer of 2017 during the Update Aquatic&#39;s development, the developers from Minecraft: Java Edition were getting feedback from the community on how they can improve the <code>/execute</code> command&#39;s syntax, and the basic concept that was conceived is this: <code>/execute</code> takes an unlimited number of <strong>subcommands</strong> that manipulate certain aspects of the command in the order you specify, then a &quot;run&quot; subcommand is placed at the end to fire a command. This allows for much greater control for what <code>/execute</code> can do to a command, and allows splitting up the executor and the command&#39;s position.</p><h2 id="new-syntax" tabindex="-1">New Syntax <a class="header-anchor" href="#new-syntax" aria-hidden="true">#</a></h2><p>Now, let&#39;s take a look at those subcommands. They are as follows:</p><h3 id="execute-as" tabindex="-1"><code>/execute as</code> <a class="header-anchor" href="#execute-as" aria-hidden="true">#</a></h3><div class="language-"><pre><code>/execute as &lt;origin: target&gt; -&gt; execute
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>Changes the target of the command, or who @s will select. This does not change the position, rotation, or dimention of the command. If multiple targets are specified, then a command is ran once for each of them, and @s selects each entity in turn.</p><h3 id="execute-at" tabindex="-1"><code>/execute at</code> <a class="header-anchor" href="#execute-at" aria-hidden="true">#</a></h3><div class="language-"><pre><code>/execute at &lt;origin: target&gt; -&gt; execute
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>Changes where the command runs, setting the command&#39;s position and dimension to the entity. This does not change the target of the command, so @s will stay as whoever was targeted last. If multiple targets are specified, then a command is ran once at each of them.</p><h3 id="execute-positioned" tabindex="-1"><code>/execute positioned</code> <a class="header-anchor" href="#execute-positioned" aria-hidden="true">#</a></h3><div class="language-"><pre><code>/execute positioned &lt;position: x y z&gt; -&gt; execute
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>Set a position for the command to run. <a href="/commands/relative-coordinates.html">Relative and local coordinates</a> are based around the current position of the command.</p><div class="language-"><pre><code>/execute positioned as &lt;origin: target&gt; -&gt; execute
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>Similar to how <code>/execute at</code> works, but only sets the command&#39;s position.</p><h3 id="execute-if-unless" tabindex="-1"><code>/execute (if|unless)</code> <a class="header-anchor" href="#execute-if-unless" aria-hidden="true">#</a></h3><p>Prevents running a command based on a condition. If the condition is true then the command will continue, or stop otherwise. <code>/execute unless</code> acts as the opposite, testing if the condition is false.</p><div class="language-"><pre><code>/execute (if|unless) entity &lt;target: target&gt; -&gt; execute
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>Acts like <code>/testfor</code>. Returns true if the targets exist.</p><div class="language-"><pre><code>/execute (if|unless) block &lt;position: x y z&gt; &lt;block: string&gt; -&gt; execute
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>Acts like <code>/testforblock</code>. Returns true if the block at the specified location exists. A data value or block state may additionally be specified, otherwise it ignores block states (acts as if it were <code>-1</code>).</p><div class="language-"><pre><code>/execute (if|unless) blocks &lt;begin: x y z&gt; &lt;end: x y z&gt; &lt;destination: x y z&gt; (all|masked) -&gt; execute
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>Acts like <code>/testforblocks</code>. Returns true if the volume at the destination matches the one at the source. <code>all</code> tests that all blocks must be there, while <code>masked</code> will ignore air blocks.</p><div class="language-"><pre><code>/execute (if|unless) score &lt;target: target&gt; &lt;objective: string&gt; matches &lt;range: integer range&gt; -&gt; execute
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>Tests if a specified score is a certain value. This uses range syntax.</p><div class="language-"><pre><code>/execute (if|unless) score &lt;target: target&gt; &lt;objective: string&gt; (=|&lt;|&lt;=|&gt;|&gt;=) &lt;source: target&gt; &lt;objective: string&gt; -&gt; execute
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>Tests if a specified score matches some logical comparison to another score. Opertors are equals (<code>=</code>), greater than (<code>&gt;</code>), greater than or equal to (<code>&gt;=</code>), less than (<code>&lt;</code>), and less than or equal to (<code>&lt;=</code>).</p><h3 id="execute-run" tabindex="-1"><code>/execute run</code> <a class="header-anchor" href="#execute-run" aria-hidden="true">#</a></h3><div class="language-"><pre><code>/execute run &lt;command: command&gt;
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>Runs a command using the current context. This argument goes last, though this isn&#39;t always required; an <code>/execute</code> command ending with <code>if</code> or <code>unless</code> is valid too.</p><h2 id="examples-and-upgrading-old-commands" tabindex="-1">Examples and Upgrading Old Commands <a class="header-anchor" href="#examples-and-upgrading-old-commands" aria-hidden="true">#</a></h2><p>Since subcommands can be chained limitlessly, there really is a nearly infinite combination of arguments for an <code>/execute</code> command and they can&#39;t all be listed. Instead, listed here are some common examples of commands.</p><p>The old functionality of <code>/execute</code> can be replicated with <code>as &lt;target&gt; at @s</code>. If you need a positional offset relative to them, add <code>positioned</code>. If you want to detect if a block is present, add <code>if block</code>. Here are some equivalents:</p><div class="language-"><pre><code># Teleport with an offset
/execute @p ~ ~1.62 ~ teleport @s ^ ^ ^3

/execute as @p at @s positioned ~ ~1.62 ~ run teleport @s ^ ^ ^3
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-"><pre><code># Chaining multiple &#39;/execute&#39;s
/execute @e[type=sheep] ~ ~ ~ execute @e[type=item,r=5] ~ ~ ~ detect ~ ~-1 ~ stone 0 kill @s

/execute at @e[type=sheep] as @e[type=item,r=5] at @s if block ~ ~-1 ~ stone 0 run kill @s
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>(Note that we don&#39;t use <code>as @e[type=sheep] at @s</code> because we don&#39;t need to execute as the sheep.)</p><p>Now for some examples of things that were either not possible or were more difficult before the new syntax was introduced.</p><div class="language-"><pre><code># Testing a fake player&#39;s score
/execute if score game_settings var matches 3.. run say [Game] Difficulty set to Hard.

# Comparing if two scores are equal
/execute as @a if score @s x = @s y run say My X is equal to my Y.

# Test for an entity without targeting it
/execute as @a at @s if entity @e[type=armor_stand,r=10] run gamemode survival @s
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,44),i=[o];function c(r,d,l,u,p,h){return a(),t("div",null,i)}var x=e(s,[["render",c]]);export{g as __pageData,x as default};
