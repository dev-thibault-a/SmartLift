# SmartLift - Plateforme de Monitoring Athlétique et Biométrique

SmartLift est une solution SaaS (Software as a Service) dédiée à l'unification du suivi de l'entraînement de force et des données de santé. Conçue pour répondre aux besoins des athlètes exigeants et des salles de sport, l'application permet de transformer les données brutes en indicateurs de progression exploitables.

## Présentation du Projet

L'application SmartLift a été développée dans une logique d'interopérabilité et de fiabilité, en s'appuyant sur des standards techniques hérités des infrastructures de réseaux et télécommunications. Elle permet de centraliser les performances athlétiques, l'évolution de la composition corporelle et l'état de récupération musculaire au sein d'une interface unique.

## Fonctionnalités Principales

### Suivi de Performance et de Force
- **Enregistrement dynamique** : Prise en compte des variantes de matériel (haltères, machines, barres, poulies).
- **Calcul de charge** : Estimation de la force théorique (1RM) basée sur la formule de Brzycki.
- **Optimisation** : Système de suggestion de charge cible basé sur l'historique de performance.

### Analyse de Récupération (Heatmap)
- **Algorithme prédictif** : Calcul de l'état de fraîcheur des groupes musculaires sur un cycle de 96 heures.
- **Aide à la décision** : Visualisation en temps réel pour orienter le choix des séances et prévenir le surentraînement.

### Intégration des Données Visbody Pro
- **Métriques de santé** : Suivi de la masse grasse, masse musculaire, taux d'hydratation, score de santé global et métabolisme basal.
- **Analyse visuelle** : Rendu graphique de l'évolution des marqueurs biométriques via Chart.js.

### Expérience Utilisateur et Continuité de Service
- **PWA (Progressive Web App)** : Fonctionnement hors-ligne (Offline First) indispensable en environnement de salle de sport.
- **Synchronisation** : Mise à jour automatique des données avec le Cloud (Supabase) dès le retour de la connectivité.

## Architecture Technique

Le projet repose sur une séparation stricte des responsabilités pour garantir la maintenabilité du code :

- **Frontend** : HTML5 / Tailwind CSS pour une interface légère et réactive.
- **Backend-as-a-Service** : Supabase (PostgreSQL) assurant l'authentification et le stockage sécurisé.
- **Sécurité** : Implémentation du *Row Level Security* (RLS) pour la confidentialité des données de santé (RGPD).
- **Visualisation** : Moteur Chart.js.

## Structure du Répertoire

```text
/SmartLift
├── index.html         # Structure HTML et points d'entrée UI
├── css/
│   └── styles.css     # Design système et styles globaux
└── js/
    ├── auth.js        # Gestion de l'authentification et de la session
    ├── workouts.js    # Logique métier des séances et de la récupération
    ├── stats.js       # Configuration et rendu des graphiques
    └── ui.js          # Navigation et gestion de l'interface utilisateur
```

## Roadmap de Développement

Le projet SmartLift suit une feuille de route itérative définie pour l'année 2026 :

1. **Phase 1 (MVP)** : Suivi de performance, heatmap de récupération et saisie manuelle des données Visbody.
2. **Phase 2 (Automatisation)** : Développement d'un module d'import automatique (Parsing PDF/CSV via Drag & Drop) pour les bilans biométriques Visbody.
3. **Phase 3 (Écosystème)** : Intégration d'un inventaire dynamique des équipements par salle, synchronisation audio (Spotify/Deezer) et portail dédié aux coachs professionnels (B2B).

## Auteur

**Thibault A.** Technicien Service Client Wholesale chez Orange.  
Apprenti en Réseaux et Télécommunications.  

*Ce projet est présenté dans le cadre du concours entrepreneurial Altern’Up 2026.*
