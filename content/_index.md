---
title: "Nerfies: Deformable Neural Radiance Fields"
description: "Deformable Neural Radiance Fields creates free-viewpoint portraits from casually captured videos."
keywords: "Nerfies, D-NeRF, NeRF"
authors:
  - name: "Author One"
    website: "https://authorone.com"
    affiliation: "1"
  - name: "Author Two"
    website: "https://authortwo.com"
    affiliation: "2"
affiliations: "<sup>1</sup>University One, <sup>2</sup>Research Lab Two"
links:
  - url: "https://arxiv.org/pdf/2011.12948"
    icon: "fas fa-file-pdf"  # Correct class name for the PDF icon
    text: "Paper"
  - url: "https://github.com/example"
    icon: "fa-brands fa-youtube"  # Correct class name for the GitHub icon
    text: "Video"
  - url: "https://github.com/example"
    icon: "fab fa-github"  # Correct class name for the GitHub icon
    text: "Code"
---

{{< abstract >}}

# Abstract

Optimizing space vehicle routing is crucial for critical applications such as on-orbit servicing, constellation deployment, and space debris de-orbiting. Multi-target Rendezvous presents a significant challenge in this domain. This problem involves determining the optimal sequence in which to visit a set of targets, and the corresponding optimal trajectories: this results in a demanding NP-hard problem.

We introduce a framework for the design and refinement of multi-rendezvous trajectories based on heuristic combinatorial optimization and Sequential Convex Programming. Our framework is both highly modular and capable of leveraging candidate solutions obtained with advanced approaches and handcrafted heuristics. 

We demonstrate this flexibility by integrating an Attention-based routing policy trained with Reinforcement Learning to improve the performance of the combinatorial optimization process. 
We show that Reinforcement Learning approaches for combinatorial optimization can be effectively applied to spacecraft routing problems. 

We apply the proposed framework to the UARX Space OSSIE mission: we are able to thoroughly explore the mission design space, finding optimal tours and trajectories for a wide variety of mission scenarios. 

## Video

{{< center width=10 >}}
  {{< youtube FMIvNuOfKuY >}}
{{< /center >}}

{{< /abstract >}}

## Icons

<div>
  <!-- Solid Icon -->
  <i class="fa-solid fa-user"></i> User Icon

  <!-- Brand Icon -->
  <i class="fa-brands fa-github"></i> GitHub Icon

  <!-- Regular Icon -->
  <i class="fa-regular fa-file-pdf"></i> PDF Icon
</div>

## Visual Effects

Using *nerfies*, you can create fun visual effects. This Dolly zoom effect would be impossible without nerfies since it would require going through a wall.

<video id="dollyzoom" autoplay controls muted loop playsinline>
  <source src="{{ "videos/dollyzoom-stacked.mp4" | relURL }}" type="video/mp4">
</video>

## Matting

As a byproduct of our method, we can also solve the matting problem by ignoring samples that fall outside of a bounding box during rendering.

<video id="matting-video" controls playsinline>
  <source src="{{ "videos/matting.mp4" | relURL }}" type="video/mp4">
</video>

<!-- Additional content... -->
