---
id: TVS-002
title: Role Standard
status: draft
version: 0.1.0
owner: TacticVision Labs
related:
  - TVS-001
  - TVS-003
  - TVS-005
---

# TVS-002 Role Standard

## 정의

Role은 선수가 특정 Position에서 수행하는 **반복적 임무와 책임의 조합**이다.

## 예시

- ST → Poacher, False 9, Target Forward
- CM → Box-to-Box Midfielder, Deep-Lying Playmaker, Mezzala
- RB → Fullback, Wingback, Inverted Fullback

## 필수 필드

- role_id
- name
- parent_positions
- primary_objective
- secondary_objectives
- key_behaviors
- required_attributes
- compatible_tactical_functions
- related_roles
- status
- version

## 금지 규칙

- Role을 Position 코드처럼 사용하지 않는다.
- 특정 선수 한 명을 기준으로 Role을 정의하지 않는다.
- 단일 통계만으로 Role을 확정하지 않는다.
