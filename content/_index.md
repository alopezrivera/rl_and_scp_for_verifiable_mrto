---
title: "CLIPort: What and Where Pathways for Robotic Manipulation"
description: "CLIPort combines semantic and spatial pathways for vision-based robotic manipulation."
keywords: "Vision-Language Grounding, Manipulation, CLIP, TransporterNets"
venue:
  name: "CoRL 2021"
  website: "https://www.robot-learning.org/"
authors:
  - name: "Mohit Shridhar"
    website: "https://mohitshridhar.com"
    affiliation: "1"
  - name: "Lucas Manuelli"
    website: "http://lucasmanuelli.com/"
    affiliation: "2"
  - name: "Dieter Fox"
    website: "https://homes.cs.washington.edu/~fox/"
    affiliation: "1, 2"
affiliations: "<sup>1</sup>University of Washington, <sup>2</sup>NVIDIA"
links:
  - url: "https://arxiv.org/pdf/2109.12098.pdf"
    icon: "fas fa-file-pdf"
    text: "Paper"
  - url: "https://youtu.be/UdzoagBgWTA"
    icon: "fab fa-youtube"
    text: "Video"
    
  - url: "https://github.com/cliport/cliport"
    icon: "fab fa-github"
    text: "Code"
---

<section class="hero teaser">
  <div class="container is-fullhd">
    <div class="hero-body">
      <video id="teaser" autoplay muted loop height="100%">
        <source src="https://cliport.github.io/media/videos/10sim_web_teaser.mp4"
                type="video/mp4">
      </video>
      <h2 class="subtitle has-text-centered">
      </br>
        <span class="dcliport">CLIPort</span> is an end-to-end imitation-learning agent that can learn a single language-conditioned policy for various tabletop tasks.
      </h2>
    </div>
  </div>
</section>

{{< carousel id="results-carousel" init=true >}}
<div class="carousel-item">
  <video class="carousel-video" controls autoplay muted loop preload="none">
    <source src="https://cliport.github.io/media/videos/1_folding.mp4" type="video/mp4">
  </video>
</div>
<div class="carousel-item">
  <video class="carousel-video" controls autoplay muted loop preload="none">
    <source src="https://cliport.github.io/media/videos/4_chess.mp4" type="video/mp4">
  </video>
</div>
<div class="carousel-item">
  <video class="carousel-video" controls autoplay muted loop preload="none">
    <source src="https://cliport.github.io/media/videos/3_packing.mp4" type="video/mp4">
  </video>
</div>
<div class="carousel-item">
  <video class="carousel-video" controls autoplay muted loop preload="none">
    <source src="https://cliport.github.io/media/videos/6_sweeping.mp4" type="video/mp4">
  </video>
</div>
{{< /carousel >}}

{{< abstract >}}

# Abstract

How can we imbue robots with the ability to manipulate objects precisely but also to reason about them in terms of abstract concepts?

Recent works in manipulation have shown that end-to-end networks can learn dexterous skills that require precise spatial reasoning, but these methods often fail to generalize to new goals or quickly learn transferable concepts across tasks. In parallel, there has been great progress in learning generalizable semantic representations for vision and language by training on large-scale internet data; however, these representations lack the spatial understanding necessary for fine-grained manipulation. To this end, we propose a framework that combines the best of both worlds: a two-stream architecture with semantic and spatial pathways for vision-based manipulation. Specifically, we present **CLIPort**, a language-conditioned imitation-learning agent that combines the broad semantic understanding (*what*) of [CLIP](https://openai.com/blog/clip/) with the spatial precision (*where*) of [TransporterNets](https://transporternets.github.io/).

Our end-to-end framework is capable of solving a variety of language-specified tabletop tasks from packing unseen objects to folding cloths, all **without any explicit representations** of object poses, instance segmentations, memory, symbolic states, or syntactic structures. Experiments in simulation and hardware show that our approach is data-efficient and generalizes effectively to seen and unseen semantic concepts. We even train **one multi-task policy** for 10 simulated and 9 real-world tasks that shows better or comparable performance to single-task policies.

{{< /abstract >}}

# Video

<div class="publication-video">
  <iframe src="https://www.youtube.com/embed/UdzoagBgWTA?rel=0&amp;showinfo=0"
          frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

# CLIPort

## Two-Stream Architecture

Broadly inspired by the [two-stream hypothesis in cognitive psychology](https://en.wikipedia.org/wiki/Two-streams_hypothesis), we present a two-stream architecture for vision-based manipulation with semantic and spatial pathways. The semantic stream uses a pre-trained CLIP model to encode RGB and language-goal input. Since CLIP is trained with large amounts of image-caption pairs from the internet, it acts as a powerful semantic prior for [grounding visual concepts](https://distill.pub/2021/multimodal-neurons/) like colors, shapes, parts, texts, and object categories. The spatial stream is a tabula rasa fully-convolutional network that encodes RGB-D input.

![Two-Stream Architecture](https://cliport.github.io/media/images/two_stream_architecture.png)

**Paradigm 1:** Unlike existing object detectors, CLIP is not limited to a predefined set of object classes. And unlike other vision-language models, it's not restricted by a top-down pipeline that detects objects with bounding boxes or instance segmentations. This allows us to forgo the traditional paradigm of training explicit detectors for cloths, pliers, chessboard squares, cherry stems, and other arbitrary things.

## TransporterNets

We use this two-stream architecture in all three networks of [TransporterNets](https://transporternets.github.io/) to predict pick and place affordances at each timestep. TransporterNets first attends to a local region to decide where to pick, then computes a placement location by finding the best match for the picked region through cross-correlation of deep visual features. This structure serves as a powerful inductive bias for learning [roto-translationally equivariant](https://fabianfuchsml.github.io/equivariance1of2/) representations in tabletop environments.

<div class="content has-text-centered">
    <video id="transporter-gif"
            controls
            muted
            autoplay
            loop
            width="40%">
    <source src="https://transporternets.github.io/images/animation.mp4"
            type="video/mp4">
    </video>
    <p>
    Credit: <a href="https://transporternets.github.io/">Zeng et. al (Google)</a>
    </p>
</div>

**Paradigm 2:** TransporterNets takes an [action-centric approach](https://en.wikipedia.org/wiki/Ecological_psychology) to perception where the objective is to *detect actions* rather than *detect objects* and then learn a policy. Keeping the action-space grounded in the perceptual input allows us to exploit geometric symmetries for efficient representation learning. When combined with CLIP's pre-trained representations, this enables the learning of reusable manipulation skills without any "objectness" assumptions.

## Results

{{< include-html "result-video-pick.html" >}}

### Affordance Predictions

Examples of pick and place affordance predictions from multi-task **CLIPort** models:

![Affordance Predictions](https://cliport.github.io/media/images/affordances.png)

![Affordance Predictions](https://cliport.github.io/media/images/affordance2.png)

## BibTeX

```bibtex
@inproceedings{shridhar2021cliport,
  title     = {CLIPort: What and Where Pathways for Robotic Manipulation},
  author    = {Shridhar, Mohit and Manuelli, Lucas and Fox, Dieter},
  booktitle = {Proceedings of the 5th Conference on Robot Learning (CoRL)},
  year      = {2021},
}
```